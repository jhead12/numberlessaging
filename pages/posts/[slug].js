import { getGlobalData } from '../../utils/global-data';
import {
  getNextPostBySlug,
  getPostBySlug,
  getPreviousPostBySlug,
  getPostFilePaths,
} from '../../utils/mdx-utils';
import { gql } from '@apollo/client';
import client from '../../utils/apollo-client';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

// Custom MDX components (optional, extend as needed)
const mdxComponents = {
  h1: (props) => <h1 className="text-4xl font-bold" {...props} />,
  p: (props) => <p className="my-4" {...props} />,
  // Add more components as needed
};

const PostPage = ({ post, globalData, prevPost, nextPost }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <div className="text-center py-12">Loading...</div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="text-center py-12">Post not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={`${post.title} - ${globalData.name}`}
        description={post.excerpt || ''}
      />
      <Header name={globalData.name} />
      <article className="px-6 md:px-0">
        <header>
          <h1 className="mb-12 text-3xl text-center md:text-5xl dark:text-white">
            {post.title}
          </h1>
          {post.excerpt && (
            <p
              className="mb-4 text-xl"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          )}
        </header>
        <main>
          <article className="prose dark:prose-dark">
            {post.source === 'mdx' ? (
              <MDXRemote {...post.content} components={mdxComponents} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            )}
          </article>
        </main>
        <div className="grid mt-12 md:grid-cols-2 lg:-mx-24">
          {prevPost && (
            <Link
              href={`/posts/${prevPost.slug}`}
              className="flex flex-col px-10 py-8 text-center transition bg-white border border-gray-800 md:text-right first:rounded-t-lg md:first:rounded-tr-none md:first:rounded-l-lg last:rounded-r-lg first last:rounded-b-lg backdrop-blur-lg dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-t md:border-r-0 md:last:border-r md:last:rounded-r-none"
            >
              <p className="mb-4 text-gray-500 uppercase dark:text-white dark:opacity-60">
                Previous
              </p>
              <h4 className="mb-6 text-2xl text-gray-700 dark:text-white">
                {prevPost.title}
              </h4>
              <ArrowIcon className="mx-auto mt-auto transform rotate-180 md:mr-0" />
            </Link>
          )}
          {nextPost && (
            <Link
              href={`/posts/${nextPost.slug}`}
              className="flex flex-col px-10 py-8 text-center transition bg-white border border-t-0 border-b-0 border-gray-800 md:text-left md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg backdrop-blur-lg dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 dark:border-white border-opacity-10 dark:border-opacity-10 first:border-t first:rounded-t-lg md:border-t last:border-b"
            >
              <p className="mb-4 text-gray-500 uppercase dark:text-white dark:opacity-60">
                Next
              </p>
              <h4 className="mb-6 text-2xl text-gray-700 dark:text-white">
                {nextPost.title}
              </h4>
              <ArrowIcon className="mx-auto mt-auto md:ml-0" />
            </Link>
          )}
        </div>
      </article>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
};

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();

  try {
    // Fetch WordPress post
    const { data } = await client.query({
      query: gql`
        query GetPostBySlug($slug: String!) {
          postBy(slug: $slug) {
            title
            slug
            excerpt
            content
          }
        }
      `,
      variables: { slug: params.slug },
    });

    const wpPost = data.postBy;

    if (wpPost) {
      // For WordPress posts, fetch prev/next from MDX utils (assuming slugs are unique across sources)
      const prevPost = await getPreviousPostBySlug(params.slug);
      const nextPost = await getNextPostBySlug(params.slug);

      return {
        props: {
          globalData,
          post: {
            ...wpPost,
            source: 'wordpress', // Add source identifier
          },
          prevPost: prevPost || null,
          nextPost: nextPost || null,
        },
        revalidate: 60, // Optional: ISR for WordPress posts
      };
    }

    // Fetch MDX post if WordPress post is not found
    const mdxPost = await getPostBySlug(params.slug);

    if (!mdxPost) {
      return {
        notFound: true,
      };
    }

    // Serialize MDX content for rendering
    const mdxSource = await serialize(mdxPost.content, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    });

    const prevPost = await getPreviousPostBySlug(params.slug);
    const nextPost = await getNextPostBySlug(params.slug);

    return {
      props: {
        globalData,
        post: {
          title: mdxPost.data.title,
          excerpt: mdxPost.data.excerpt || null,
          content: mdxSource,
          slug: params.slug,
          source: 'mdx', // Add source identifier
        },
        prevPost: prevPost || null,
        nextPost: nextPost || null,
      },
    };
  } catch (error) {
    console.error('Error fetching post:', error.message);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths = async () => {
  try {
    // Fetch WordPress post slugs
    const { data } = await client.query({
      query: gql`
        query GetAllPosts {
          posts {
            nodes {
              slug
            }
          }
        }
      `,
    });

    const wpPaths = data.posts.nodes.map((post) => ({
      params: { slug: post.slug },
    }));

    // Fetch MDX post slugs
    const mdxPaths = getPostFilePaths().map((slug) => ({
      params: { slug },
    }));

    return {
      paths: [...wpPaths, ...mdxPaths],
      fallback: 'blocking', // Use 'blocking' for better SEO and UX
    };
  } catch (error) {
    console.error('Error fetching paths:', error.message);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export default PostPage;
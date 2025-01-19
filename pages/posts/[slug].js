import { getGlobalData } from '../../utils/global-data';
import {
  getNextPostBySlug,
  getPostBySlug,
  getPreviousPostBySlug,
  getPostFilePaths,
} from '../../utils/mdx-utils';

import { gql } from '@apollo/client';
import client from '../../utils/apollo-client';
import Head from 'next/head';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import CustomImage from '../../components/CustomImage';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import { MDXRemote } from 'next-mdx-remote';
import styles from '../../styles/Post.module.css';

const PostPage = ({ post, globalData, prevPost, nextPost }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
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
            <p className="mb-4 text-xl" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          )}
        </header>
        <main>
          {post.content && (
            <article className="prose dark:prose-dark">
              {typeof post.content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <MDXRemote {...post.content} />
              )}
            </article>
          )}
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

export default PostPage;

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

    // If WordPress post is found, use it
    if (wpPost) {
      const prevPost = await getPreviousPostBySlug(params.slug);
      const nextPost = await getNextPostBySlug(params.slug);

      return {
        props: {
          globalData,
          post: wpPost,
          prevPost,
          nextPost,
        },
      };
    }

    // Fetch MDX post if WordPress post is not found
    const { mdxSource, data: mdxData } = await getPostBySlug(params.slug);

    const post = { title: mdxData.title, excerpt: mdxData.excerpt || null, content: mdxSource };

    const prevPost = await getPreviousPostBySlug(params.slug);
    const nextPost = await getNextPostBySlug(params.slug);

    return {
      props: {
        globalData,
        post,
        prevPost,
        nextPost,
      },
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths = async () => {
  try {
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

    const mdxPaths = getPostFilePaths()
      .map((path) => path.replace(/\.mdx?$/, ''))
      .map((slug) => ({ params: { slug } }));

    return {
      paths: [...wpPaths, ...mdxPaths],
      fallback: true,
    };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

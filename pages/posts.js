import { getPosts } from '../utils/mdx-utils';
import Link from 'next/link';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { getGlobalData } from '../utils/global-data';
import sanitizeHtml from 'sanitize-html';

export default function PostsPage({ posts, globalData }) {
  return (
    <Layout>
      <SEO
        title={`Blog Posts - ${globalData.name}`}
        description="Explore our collection of blog posts."
      />
      <div className="px-6 md:px-0">
        <h1 className="text-3xl md:text-5xl text-center mb-12 dark:text-white">
          Blog Posts
        </h1>
        {posts.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No posts found.
          </p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li
                key={post.id}
                className="p-6 bg-white dark:bg-black dark:bg-opacity-30 backdrop-blur-lg rounded-lg border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition"
              >
                <Link href={`/posts/${post.slug}`}>
                  <a className="text-2xl text-gray-700 dark:text-white hover:underline">
                    {post.title}
                  </a>
                </Link>
                {post.date && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                )}
                {post.excerpt && (
                  <p
                    className="mt-2 text-gray-600 dark:text-gray-300"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(post.excerpt, {
                        allowedTags: ['p', 'strong', 'em'],
                        allowedAttributes: {},
                      }),
                    }}
                  />
                )}
                {post.description && (
                  <p
                    className="mt-2 text-gray-600 dark:text-gray-300"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(post.description, {
                        allowedTags: ['p', 'strong', 'em'],
                        allowedAttributes: {},
                      }),
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const posts = await getPosts();

    // Map posts to a consistent structure
    const mappedPosts = posts
      .map((post) => ({
        id: post.filePath || post.slug || post.data.title, // Fallback ID
        title: post.data.title || 'Untitled',
        excerpt:
          typeof post.data.excerpt === 'string'
            ? sanitizeHtml(post.data.excerpt.replace(/<\/?[^>]+(>|$)/g, ''), {
                allowedTags: [],
                allowedAttributes: {},
              })
            : '',
        filePath: post.filePath || null,
        slug: post.slug || null,
        primaryImage: post.data.primaryImage || null,
        date: post.data.date || null,
        description:
          typeof post.data.description === 'string'
            ? sanitizeHtml(post.data.description.replace(/<\/?p[^>]*>/g, ''), {
                allowedTags: [],
                allowedAttributes: {},
              })
            : '',
      }))
      .filter((post) => post.title && post.title !== 'Untitled'); // Filter invalid posts

    return {
      props: {
        posts: mappedPosts,
        globalData: getGlobalData(),
      },
      revalidate: 60, // ISR for WordPress posts
    };
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    return {
      props: {
        posts: [],
        globalData: getGlobalData(),
      },
    };
  }
}
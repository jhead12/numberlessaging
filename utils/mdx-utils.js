import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { gql } from '@apollo/client';
import client from '../utils/apollo-client';

// Define the path to the posts directory
const POSTS_PATH = path.join(process.cwd(), 'posts');

// Cache for WordPress posts to avoid repeated queries
let wpPostsCache = null;

// Helper function to read and parse MDX files
const readMDXFile = (filePath) => {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return { data, content };
  } catch (error) {
    console.error(`Error reading MDX file ${filePath}:`, error.message);
    return null;
  }
};

// Fetch and cache WordPress posts
const fetchWordPressPosts = async () => {
  if (wpPostsCache) {
    return wpPostsCache;
  }

  try {
    const { data } = await client.query({
      query: gql`
        query GetAllPosts {
          posts {
            nodes {
              slug
              title
              excerpt
              content
              date
            }
          }
        }
      `,
    });

    wpPostsCache = data.posts.nodes.map((post) => ({
      filePath: null,
      slug: post.slug,
      data: {
        title: post.title || 'Untitled',
        excerpt: post.excerpt || '',
        date: post.date || null,
      },
      content: post.content,
      source: 'wordpress',
    }));

    return wpPostsCache;
  } catch (error) {
    console.error('Error fetching WordPress posts:', error.message);
    return [];
  }
};

// Get all posts (MDX and WordPress)
export const getPosts = async () => {
  try {
    // Fetch MDX posts
    const mdxFiles = fs
      .readdirSync(POSTS_PATH)
      .filter((file) => /\.mdx?$/.test(file));
    const mdxPosts = mdxFiles
      .map((file) => {
        const filePath = path.join(POSTS_PATH, file);
        const post = readMDXFile(filePath);
        if (!post) return null;
        return {
          filePath: file,
          slug: file.replace(/\.mdx?$/, ''),
          data: {
            title: post.data.title || 'Untitled',
            excerpt: post.data.excerpt || '',
            date: post.data.date || null,
          },
          content: post.content,
          source: 'mdx',
        };
      })
      .filter((post) => post !== null);

    // Fetch WordPress posts
    const wpPosts = await fetchWordPressPosts();

    // Combine and sort by date (descending)
    return [...mdxPosts, ...wpPosts].sort(
      (a, b) => new Date(b.data.date || 0) - new Date(a.data.date || 0)
    );
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    return [];
  }
};

// Get a single post by slug
export const getPostBySlug = async (slug) => {
  if (process.env.NODE_ENV === 'production' && !fs.existsSync(POSTS_PATH)) {
    // Return mock data for production if posts directory is unavailable
    return {
      filePath: `${slug}.mdx`,
      slug,
      data: { title: 'Mock Title', excerpt: 'Mock Excerpt', date: null },
      content: '<p>Mock Content</p>',
      source: 'mdx',
    };
  }

  // Check MDX posts
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  if (fs.existsSync(postFilePath)) {
    const post = readMDXFile(postFilePath);
    if (!post) {
      throw new Error(`Post with slug "${slug}" not found.`);
    }
    return {
      filePath: `${slug}.mdx`,
      slug,
      data: {
        title: post.data.title || 'Untitled',
        excerpt: post.data.excerpt || '',
        date: post.data.date || null,
      },
      content: post.content,
      source: 'mdx',
    };
  }

  // Check WordPress posts
  const wpPosts = await fetchWordPressPosts();
  const wpPost = wpPosts.find((post) => post.slug === slug);
  if (wpPost) {
    return wpPost;
  }

  throw new Error(`Post with slug "${slug}" not found.`);
};

// Get the next post by slug
export const getNextPostBySlug = async (slug) => {
  const posts = await getPosts();
  const currentPostIndex = posts.findIndex((post) => post.slug === slug);

  if (currentPostIndex === -1 || currentPostIndex === posts.length - 1) {
    return null;
  }

  const post = posts[currentPostIndex + 1];
  return {
    title: post.data.title,
    slug: post.slug,
  };
};

// Get the previous post by slug
export const getPreviousPostBySlug = async (slug) => {
  const posts = await getPosts();
  const currentPostIndex = posts.findIndex((post) => post.slug === slug);

  if (currentPostIndex <= 0) {
    return null;
  }

  const post = posts[currentPostIndex - 1];
  return {
    title: post.data.title,
    slug: post.slug,
  };
};

// Get all post file paths (for static generation)
export const getPostFilePaths = async () => {
  const posts = await getPosts();
  return posts.map((post) => post.slug);
};
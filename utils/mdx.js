import fs from 'fs';
import path from 'path';
const POSTS_PATH = path.join(process.cwd(), 'posts');

// Function to get MDX posts
export const getPosts = () => {
  if (process.env.NODE_ENV === 'production') {
    // Mock data for production builds
    return [];
  }

  const mdxFiles = fs.readdirSync(POSTS_PATH).filter((file) => /\.mdx?$/.test(file));
  return mdxFiles.map((file) => ({
    filePath: file,
    data: { title: 'Mock Title', excerpt: 'Mock Excerpt' },
    content: '<p>Mock Content</p>',
  }));
};

export const getNextPostBySlug = (slug) => {
  if (process.env.NODE_ENV === 'production') {
    // Mock data for production builds
    return null;
  }

  const posts = getPosts();
  const currentFileName = `${slug}.mdx`;
  const currentPostIndex = posts.findIndex((post) => post.filePath.replace(/\.mdx?$/, '') === slug);
  const post = posts[currentPostIndex + 1];

  if (!post) return null;

  const nextPostSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: nextPostSlug,
  };
};

export const getPreviousPostBySlug = (slug) => {
  if (process.env.NODE_ENV === 'production') {
    // Mock data for production builds
    return null;
  }

  const posts = getPosts();
  const currentFileName = `${slug}.mdx`;
  const currentPostIndex = posts.findIndex((post) => post.filePath.replace(/\.mdx?$/, '') === slug);
  const post = posts[currentPostIndex - 1];

  if (!post) return null;

  const previousPostSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: previousPostSlug,
  };
};
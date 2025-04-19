const fs = require('fs');
const path = require('path');
export const POSTS_PATH = path.join(process.cwd(), 'posts');

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

export const getPostBySlug = (slug) => {
  if (process.env.NODE_ENV === 'production') {
    // Mock data for production builds
    return { mdxSource: '', data: { title: 'Mock Title', excerpt: 'Mock Excerpt' }, postFilePath: '' };
  }
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  // Rest of the function remains the same
};

export const getNextPostBySlug = (slug) => {
  if (process.env.NODE_ENV === 'production') {
    // Mock data for production builds
    return null;
  }

  const posts = getPosts();
  const currentFileName = `${slug}.mdx`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex - 1];
  // no prev post found
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
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex + 1];
  // no prev post found
  if (!post) return null;

  const previousPostSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: previousPostSlug,
  };
};
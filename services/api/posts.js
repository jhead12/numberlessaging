import { gql } from '@apollo/client';
import client from '../../utils/apollo-client';
import { getPosts as getMdxPosts } from '../../utils/mdx-utils';

const FetchPosts = () => {
  const fetchPosts = async () => {
    try {
    // Fetch WordPress posts
    const { data } = await client.query({
      query: gql`
        query GetPosts {
          posts {
            nodes {
              id
              title
              slug
              excerpt
              content
            }
          }
        }
      `,
    });

    const wpPosts = data.posts.nodes;

    // Fetch MDX posts
    const mdxPosts = getMdxPosts().map((post) => ({
      id: post.filePath,
      title: post.data.title,
      slug: post.filePath.replace(/\.mdx?$/, ''),
      excerpt: post.data.excerpt,
      content: post.content,
    }));

    // Combine WordPress and MDX posts
    const combinedPosts = [...wpPosts, ...mdxPosts];

    console.log('Fetched posts:', combinedPosts); // Log the combined posts

    return combinedPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

  return <div>{fetchPosts()}</div>;
};

export default FetchPosts; // Default export
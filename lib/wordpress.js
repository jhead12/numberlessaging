import { GraphQLClient, gql } from 'graphql-request';
import axios from 'axios';

const endpoint = process.env.NEXT_PUBLIC_WPURL + '/graphql';

const graphQLClient = new GraphQLClient(endpoint);

const query = gql`
  query GetPosts {
    posts {
      nodes {
        id
        slug
        title
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export async function getWordPressPosts() {
  try {
  const data = await graphQLClient.request(query);
  return data.posts.nodes.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title || 'Untitled',
    date: post.date,
    excerpt: post.excerpt || null,
    primaryImage: post.featuredImage?.node?.sourceUrl || null,
    description: post.excerpt ? post.excerpt.replace(/<\/?a[^>]*>/g, '') : null, // Remove <a> tags from description
  }));
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return []; // Return empty array if data cannot be fetched
}
}

export async function getComments(postId) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_WPURL}/wp-json/wp/v2/comments?post=${postId}`);
  return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return []; // Return empty array if data cannot be fetched
}
}

export async function postComment(postId, authorName, authorEmail, content) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_WPURL}/wp-json/wp/v2/comments`, {
      post: postId,
      author_name: authorName,
      author_email: authorEmail,
      content,
    });
    return response.data;
  } catch (error) {
    console.error('Error posting comment:', error);
    return null; // Return null if data cannot be fetched
  }
}

// For fallback strategies in Next.js application, you can use fallback: 'blocking' or fallback: true in getStaticPaths.

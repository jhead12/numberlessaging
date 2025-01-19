import { GraphQLClient, gql } from 'graphql-request';

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
  const data = await graphQLClient.request(query);
  console.log('Fetched WordPress posts:', data.posts.nodes); // Debugging line
  return data.posts.nodes.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title || 'Untitled',
    date: post.date,
    excerpt: post.excerpt || null,
    primaryImage: post.featuredImage?.node?.sourceUrl || null,
    description: post.excerpt || null, // Ensure description is set
  }));
}

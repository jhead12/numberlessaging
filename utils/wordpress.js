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
  return data.posts.nodes.map(post => ({
    id: post.id,
    slug: post.slug,
    data: {
      title: post.title,
      date: post.date,
      description: post.excerpt || null,
      primaryImage: post.featuredImage?.node?.sourceUrl || null,
    },
  }));
}

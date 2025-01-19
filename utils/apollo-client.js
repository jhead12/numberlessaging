// apollo-client.js
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_WPURL +'/graphql', // Replace with your GraphQL endpoint
  }),
  cache: new InMemoryCache(),
});

export default client;

// apollo-client.js
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql', // Replace with your GraphQL endpoint
  }),
  cache: new InMemoryCache(),
});

export default client;

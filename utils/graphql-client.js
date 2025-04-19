import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_WPURL + '/graphql';

export const graphQLClient = new GraphQLClient(endpoint);
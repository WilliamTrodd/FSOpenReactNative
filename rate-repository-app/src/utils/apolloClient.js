import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import Constants from 'expo-constants';
import { relayStylePagination } from "@apollo/client/utilities";

const httpLink = createHttpLink({
  uri: Constants.manifest.extra.apolloUri
});

const cache = new InMemoryCache({
  typePolicies:{
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
    User: {
      fields: {
        reviews: relayStylePagination(),
      }
    }
  },
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      headers = {...headers, authorization: accessToken ? `bearer ${accessToken}` : ''}
      return {
        headers: {
          ...headers
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};

export default createApolloClient;
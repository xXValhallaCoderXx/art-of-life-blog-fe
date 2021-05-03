import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const GQL_API = process.env.NEXT_PUBLIC_GQL_API;

let apolloClient;

// Return an instance of Apollo client
const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: new HttpLink({
      uri: GQL_API,
    }),
    cache: new InMemoryCache(),
  });

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

export function useApollo(initialState) {
  // We want apollo client to be updated only when cache has changed
  // Recomputes only when initialState change
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

/*

  SSR Mode - True since we need pre rendered pages but false when its rendered on client for dynamic data
  */

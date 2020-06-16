import { ApolloClient } from "apollo-client";  
import { InMemoryCache } from "apollo-cache-inmemory";  
import withApollo from "next-with-apollo";  
import { createHttpLink } from "apollo-link-http";  
import fetch from "isomorphic-unfetch";

// Update the GraphQL endpoint to any instance of GraphQL that you like
// const GRAPHQL_URL = `https://art-of-life-blog-be.herokuapp.com/graphql`;
const GQL_API = process.env.NEXT_PUBLIC_GQL_API;

const link = createHttpLink({  
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: GQL_API
});

// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(  
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })
  ({ initialState }) =>
    new ApolloClient({
      link: link,
      cache: new InMemoryCache()
        //  rehydrate the cache using the initial data passed from the server:
        .restore(initialState || {})
    })
);
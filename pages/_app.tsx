import React from "react";   
import { ApolloProvider } from "@apollo/react-hooks";  
import withData from "../shared/utils/apollo-setup";

const App: any = ({ Component, pageProps, apollo }: any) => {  
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
};

// Wraps all components in the tree with the data provider
export default withData(App);
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import withData from "../shared/utils/apollo-setup";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "shared/styles/theme";

const App: any = ({ Component, pageProps, apollo }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
};

// Wraps all components in the tree with the data provider
export default withData(App);

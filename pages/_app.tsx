import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import withData from "../shared/utils/apollo-setup";
import { ThemeProvider } from "@material-ui/core/styles";
import mixpanel from "mixpanel-browser";
import { MixpanelProvider } from "react-mixpanel";
import theme from "shared/styles/theme";

mixpanel.init("a5b1c837a1313cb3863d5563dc6bbcc0");

const App: any = ({ Component, pageProps, apollo }: any) => {
  return (
    <MixpanelProvider mixpanel={mixpanel}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </MixpanelProvider>
  );
};

// Wraps all components in the tree with the data provider
export default withData(App);

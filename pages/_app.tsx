import "shared/styles/index.scss";
import "github-markdown-css";
import React from "react";

import { useApollo } from "../shared/utils/apollo-client";
import { ThemeProvider } from "@material-ui/core/styles";
import mixpanel from "mixpanel-browser";
import { MixpanelProvider } from "react-mixpanel";
import theme from "shared/styles/theme";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@material-ui/core/CssBaseline";
import createCache from "@emotion/cache";
import { ApolloProvider } from "@apollo/react-hooks";

export const cache = createCache({ key: "css", prepend: true });

const App: any = ({ Component, pageProps }: any) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [mixpanelInit, setMixpanelInit] = React.useState(false);
  React.useEffect(() => {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID);
    mixpanel.identify();
    setMixpanelInit(true);
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);
  return mixpanelInit ? (
    <CacheProvider value={cache}>
      <MixpanelProvider mixpanel={mixpanel}>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <CssBaseline />
            <Component {...pageProps} />
          </ApolloProvider>
        </ThemeProvider>
      </MixpanelProvider>
    </CacheProvider>
  ) : null;
};

// Wraps all components in the tree with the data provider
export default App;

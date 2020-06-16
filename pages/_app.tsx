import "shared/styles/index.scss";
import "github-markdown-css";
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import withData from "../shared/utils/apollo-setup";
import { ThemeProvider } from "@material-ui/core/styles";
import mixpanel from "mixpanel-browser";
import { MixpanelProvider } from "react-mixpanel";
import theme from "shared/styles/theme";

const App: any = ({ Component, pageProps, apollo }: any) => {
  const [mixpanelInit, setMixpanelInit] = React.useState(false);
  React.useEffect(() => {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID);
    mixpanel.identify();
    setMixpanelInit(true);
  }, []);
  return mixpanelInit ? (
    <MixpanelProvider mixpanel={mixpanel}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </MixpanelProvider>
  ) : null;
};

// Wraps all components in the tree with the data provider
export default withData(App);

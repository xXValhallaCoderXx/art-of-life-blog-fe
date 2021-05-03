import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { TopNav } from "../navigation";
import Container from "@material-ui/core/Container";
import MY_SEO from "shared/utils/seo-meta";
import { MixpanelConsumer } from "react-mixpanel";
import { initGA, logPageView } from "shared/utils/ga-analytics";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  innerContainer: {
    paddingTop: 100,
  },
}));

const HomeLayout: React.FC<Props> = ({
  title,
  description,
  image,
  children,
}) => {
  const router = useRouter();
  // @ts-ignore
  const classes = useStyles();
  React.useEffect(() => {
    // @ts-ignore
    if (!window.GA_INITIALIZED) {
      initGA();
      // @ts-ignore
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);
  return (
    <MixpanelConsumer>
      {(mixpanel) => {
        mixpanel.track("PAGE VIEW", { page: router.pathname });
        return (
          <div>
            <Head>
              <title key="title">{title || MY_SEO.title}</title>

              <meta
                key="description"
                name="description"
                content={description || MY_SEO.description}
              />
              <meta
                key="og:type"
                name="og:type"
                content={MY_SEO.openGraph.type}
              />
              <meta
                key="og:title"
                name="og:title"
                content={title || MY_SEO.openGraph.title}
              />
              <meta
                key="og:description"
                name="og:description"
                content={description || MY_SEO.openGraph.description}
              />
              <meta key="og:url" name="og:url" content={MY_SEO.openGraph.url} />
              <meta
                key="og:image"
                name="og:image"
                content={image || MY_SEO.openGraph.image}
              />
            </Head>
            <div className={classes.innerContainer}>
              <TopNav />
              <Container maxWidth="xl">{children}</Container>
            </div>
          </div>
        );
      }}
    </MixpanelConsumer>
  );
};

export default HomeLayout;

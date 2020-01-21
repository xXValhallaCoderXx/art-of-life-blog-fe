import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import { TopNav } from "../navigation";
import Container from "@material-ui/core/Container";
import MY_SEO from "shared/utils/seo-meta";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  children: React.ReactNode;
}

const useStyles = makeStyles(theme => ({
  innerContainer: {
    paddingTop: 100
  }
}));

export default ({ children, title, description, image }: Props) => {
  // @ts-ignore
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title key="title">{MY_SEO.title}</title>

        <meta
          key="description"
          name="description"
          content={MY_SEO.description}
        />
        <meta key="og:type" name="og:type" content={MY_SEO.openGraph.type} />
        <meta key="og:title" name="og:title" content={MY_SEO.openGraph.title} />
        <meta
          key="og:description"
          name="og:description"
          content={MY_SEO.openGraph.description}
        />
        <meta key="og:url" name="og:url" content={MY_SEO.openGraph.url} />
        <meta key="og:image" name="og:image" content={MY_SEO.openGraph.image} />
      </Head>
      <div className={classes.innerContainer}>
        <TopNav />
        <Container maxWidth="xl">{children}</Container>
      </div>
    </div>
  );
};

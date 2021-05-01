import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import get from "lodash/get";
import { HomeLayout } from "shared/components/layouts";
import Query from "shared/components/query-component";
import { FETCH_POSTS_ID, FETCH_POST } from "shared/queries/posts";
import ReactMarkdown from "react-markdown/with-html";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";

import { CategoryList } from "shared/components/blog";
import { parseISO, format } from "date-fns";
import startCase from "lodash/startCase";
import { initializeApollo } from "../../shared/utils/apollo-client";

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    marginTop: -30,
    padding: 40,
  },
  imageWrapper: {
    marginBottom: 30,
    objectFit: "cover",
    objectPosition: "50% 0%",
    width: "100%",
    height: 600,
  },
  title: {
    fontWeight: 500,
    marginBottom: 30,
    textTransform: "uppercase",
    [theme.breakpoints.down("md")]: {
      marginTop: 30,
      fontSize: "2rem",
    },
  },
  relatedArticlesTitle: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },
  },
  categoriesCard: {
    marginTop: 50,
  },
}));

const Post = (props) => {
  const router = useRouter();
  // const { id }: any = router.query;
  // @ts-ignore
  const classes = useStyles();
  console.log("POST: ", props);
  return <HomeLayout>Hello</HomeLayout>;

  function handleSubCategories(countries, current) {
    const filteredCountries = countries.filter(
      (country) => country.title !== current
    );
    if (filteredCountries.length === 0) {
      return (
        <Typography color="textPrimary" align="left" variant="h6">
          No Related Categories
        </Typography>
      );
    }
    return filteredCountries.map((country, index) => {
      return (
        <Typography
          key={index}
          color="primary"
          align="left"
          variant="subtitle2"
        >
          <Link href={`/category/sub-category/${country.id}`}>
            <a>{startCase(country.title)}</a>
          </Link>
        </Typography>
      );
    });
  }

  function handleRelatedArticles(posts) {
    const filteredArtciles = posts.filter((post) => post.id !== id);
    if (filteredArtciles.length === 0) {
      return (
        <Typography color="textPrimary" align="left" variant="h6">
          No Related Articles
        </Typography>
      );
    } else {
      return filteredArtciles.map((article, index) => {
        const result = parseISO(article.updated_at);
        return (
          <Typography
            key={index}
            color="primary"
            align="left"
            variant="subtitle2"
          >
            <Link href={`/article/${article.id}`}>
              <a>
                {" "}
                {article.title} - {format(result, "dd/MM/yyyy")}
              </a>
            </Link>
          </Typography>
        );
      });
    }
  }
};

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const res = await apolloClient.query({
    query: FETCH_POSTS_ID,
  });
  if (res.data.posts && res.data.posts.length > 0) {
    const paths = res.data.posts.map((post) => ({
      params: { id: post.id },
    }));
    return { paths, fallback: false };
  }

  return { paths: [], fallback: false };
}

export async function getStaticProps(context) {
  const apolloClient = initializeApollo();
  console.log("CONTEXT: ", context.params);
  const res = await apolloClient.query(
    {
      query: FETCH_POST,
    },
    { variables: { id: parseInt(context.params.id) } }
  );
  console.log("WHAT IS GOING ON : ", res);
  return {
    props: { post: res.data },
  };
}

// export default Post;
export default Post;

{
  /* <HomeLayout
title={`Art Of Life - ${data.post.title}`}
image={data.post.image[0].url}
>
<Grid container spacing={3}>
  <Grid item xs={12} sm={8} md={8} lg={9}>
    <Card>
      <img
        className={classes.imageWrapper}
        src={get(data, "post.image[0].url")}
      />
      <div className={classes.cardWrapper}>
        <Typography
          component="div"
          variant="subtitle1"
          color="primary"
        >
          <Box letterSpacing={3} m={1}>
            <a
              onClick={() => `/category/${data.post.category.id}`}
              style={{ textTransform: "uppercase" }}
            >
              {startCase(data.post.category.title)}
            </a>
            <span style={{ marginLeft: 5, marginRight: 5 }}>-</span>
            <a
              onClick={() =>
                `/category/sub-category/${data.post.sub_category.id}`
              }
              style={{ textTransform: "uppercase" }}
            >
              {startCase(data.post.sub_category.title)}
            </a>
          </Box>
        </Typography>

        <Typography
          className={classes.title}
          color="textPrimary"
          align="left"
          variant="h4"
        >
          {data.post.title}
        </Typography>

        <div
          className={
            "markdown-wrapper markdown-body react-markdown-img-center"
          }
        >
          <ReactMarkdown
            escapeHtml={false}
            source={data.post.content}
          />
        </div>
      </div>
    </Card>
  </Grid>
  <Grid item xs={12} sm={4} md={4} lg={3}>
    <Card>
      <CardContent>
        <Typography
          className={classes.relatedArticlesTitle}
          color="primary"
          align="left"
          variant="h5"
        >
          Related Articles -{" "}
          {startCase(data.post.sub_category.title)}
        </Typography>
        <div style={{ marginTop: 10, marginBottom: 30 }}>
          {handleRelatedArticles(data.post.sub_category.posts)}
        </div>
        <Typography
          className={classes.relatedArticlesTitle}
          color="primary"
          align="left"
          variant="h5"
        >
          Related Categories
        </Typography>
        <div style={{ marginTop: 5 }}>
          {handleSubCategories(
            data.post.category.sub_categories,
            data.post.sub_category.title
          )}
        </div>
      </CardContent>
    </Card>
    <Card className={classes.categoriesCard}>
      <CardContent>
        <CategoryList categories={data.categories} />
      </CardContent>
    </Card>
  </Grid>
</Grid>
</HomeLayout> */
}

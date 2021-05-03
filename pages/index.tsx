import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import get from "lodash/get";
import { FETCH_HOME_DATA, FETCH_POSTS_ID } from "shared/queries/posts";

import { HomeLayout } from "shared/components/layouts";
import {
  FeaturePostHome,
  LatestPostCard,
  StarPost,
  CategoryList,
} from "shared/components/blog";
import { ErrorBoundary } from "shared/components";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

import { initializeApollo } from "shared/utils/apollo-client";

const useStyles = makeStyles((theme) => ({
  avatarImage: {
    objectFit: "cover",
  },
  stickyPostTitle: {
    marginTop: "5vh",
    marginBottom: 20,
  },
  categoryWrapper: {
    marginTop: "5vh",
  },
  bioStyle: {
    marginTop: 15,
  },
  blogsSection: {
    marginTop: 30,
    marginLeft: "1vh",
  },
  latestPostTitle: {
    marginTop: 50,
    marginBottom: 30,
  },
  latestPostContainer: {
    paddingRight: 10,
  },
}));

// Home.getInitialProps = async ({ req }) => {
//   const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
//   return { userAgent };
// };

const renderFeaturePost = (post) => {
  if (post) {
    return (
      <FeaturePostHome
        publishedAt={get(post, "post.updated_at")}
        image={get(post, "post.image[0].url")}
        category={get(post, "post.category.title")}
        title={get(post, "post.title")}
        id={get(post, "post.id")}
      />
    );
  } else {
    return (
      <Typography align="center" color="textSecondary" variant="h4">
        No Featured Post
      </Typography>
    );
  }
};

const renderStarPosts = (posts: any) => {
  if (posts.length === 0) {
    return (
      <Typography
        align="left"
        color="textSecondary"
        variant="h6"
        style={{ marginLeft: "1vh", marginTop: -10 }}
      >
        No Pinned Articles
      </Typography>
    );
  }
  return posts[0].posts.map((post: any, index: any) => {
    return (
      <StarPost
        key={index}
        id={post.id}
        publishedAt={post.updated_at}
        categoryID={post.category.id}
        category={post.category.title}
        img={post.image[0].url}
        title={post.title}
      />
    );
  });
};

const renderLatestPosts = (posts: any) => {
  if (posts.length === 0) {
    return (
      <Typography
        align="center"
        color="textSecondary"
        variant="h4"
        style={{ marginLeft: "2vh" }}
      >
        No Posts to display
      </Typography>
    );
  }
  return posts.map((post, index) => {
    return (
      <Grid item md={4} xs={12} key={index}>
        <LatestPostCard
          id={get(post, "id")}
          image={get(post, "image[0].url")}
          title={get(post, "title")}
          category={get(post, "category.title")}
          categoryID={get(post, "category.id")}
          publishedAt={get(post, "updated_at")}
        />
      </Grid>
    );
  });
};

const Home: NextPage = (props: any) => {
  const classes = useStyles();

  return (
    <ErrorBoundary>
      <HomeLayout>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8} xl={9}>
            <section id="feature-post">
              {renderFeaturePost(props.data.featurePost)}
            </section>
            <section className={classes.blogsSection} id="blogs">
              <Grid container direction="column" spacing={3}>
                <Typography
                  className={classes.latestPostTitle}
                  variant="h4"
                  color="primary"
                >
                  Latest Posts
                </Typography>
                <Grid
                  container
                  alignItems="stretch"
                  spacing={5}
                  className={classes.latestPostContainer}
                >
                  {renderLatestPosts(props.data.posts)}
                </Grid>
              </Grid>
            </section>
          </Grid>
          <Grid item xs={12} md={4} lg={4} xl={3}>
            <Box boxShadow={5}>
              <Card>
                <CardContent style={{ padding: 40 }}>
                  <Typography
                    style={{ marginBottom: 10, marginTop: -10 }}
                    color="textPrimary"
                    variant="h6"
                  >
                    ABOUT ME
                  </Typography>

                  <Image
                    width="370"
                    height="370"
                    src={"/images/portrait-image.jpg"}
                    alt="me"
                    className={classes.avatarImage}
                  />
                  <Typography
                    className={classes.bioStyle}
                    color="textSecondary"
                    style={{ fontSize: 19 }}
                  >
                    Hail! i'm Renate! <br />
                    <br />
                    I'm a British / Portuguese human (born and raised on little
                    Guernsey), with a huge love for friends, family, travel,
                    fitness and just life in general, and always have a lot to
                    say. <br />
                    <br />
                    This will be my platform to share my thoughts and
                    adventures!
                  </Typography>
                  <Typography
                    className={classes.stickyPostTitle}
                    color="textPrimary"
                    variant="h6"
                  >
                    PINNED ARTICLES
                  </Typography>
                  <div>{renderStarPosts(props.data.starPosts)}</div>
                  <div className={classes.categoryWrapper}>
                    <CategoryList categories={props.data.categories} />
                  </div>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </HomeLayout>
    </ErrorBoundary>
  );
};

//getStaticProps
/*
  - For statically generating pages
  - This function is used at build process to get any data needed for props
*/

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const res = await apolloClient.query({
    query: FETCH_HOME_DATA,
  });

  return {
    props: {
      data: res.data,
    },
    revalidate: 1,
  };
}

export default Home;

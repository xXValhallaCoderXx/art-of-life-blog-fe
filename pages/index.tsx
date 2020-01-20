import React from "react";
import get from "lodash/get";
import { NextPage } from "next";

import { FETCH_HOME_DATA } from "shared/queries/posts";

import { HomeLayout } from "shared/components/layouts";
import {
  FeaturePostHome,
  LatestPostCard,
  StarPost,
  CategoryList
} from "shared/components/blog";
import { ErrorBoundary } from "shared/components";

import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Query from "shared/components/query-component";

const useStyles = makeStyles(theme => ({
  avatarImage: {
    maxHeight: 300,
    width: "100%",
    objectFit: "cover"
  },
  stickyPostTitle: {
    marginTop: 20,
    marginBottom: 20,
    borderBottom: `2px solid ${theme.palette.primary.light}`
  },
  bioStyle: {
    marginTop: 15
  },
  blogsSection: {
    marginTop: 30,
    marginLeft: "1vh"
  },
  latestPostTitle: {
    marginTop: 50,
    marginBottom: 30
  },
  latestPostContainer: {
    paddingRight: 10
  }
}));

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => {
  // @ts-ignore
  const classes = useStyles();
  const [snackOpen, setSnackOpen] = React.useState(true);
  const avatarImage = require("shared/images/portrait-image.jpg");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };
  return (
    <ErrorBoundary>
      <Query query={FETCH_HOME_DATA}>
        {({ data }: any) => {
          return (
            <HomeLayout>
              <Snackbar
                open={snackOpen}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="warning">
                  Website UI still under construction! - Just want to start
                  pushing content :>
                </Alert>
              </Snackbar>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={9}>
                  <section id="feature-post">
                    {renderFeaturePost(data.featurePost)}
                  </section>
                  <section className={classes.blogsSection} id="blogs">
                    <Grid container direction="column" spacing={3}>
                      <Typography
                        className={classes.latestPostTitle}
                        variant="h4"
                        color="primary"
                      >
                        LATEST POSTS
                      </Typography>
                      <Grid
                        container
                        alignItems="stretch"
                        spacing={5}
                        className={classes.latestPostContainer}
                      >
                        {renderLatestPosts(data.posts)}
                      </Grid>
                    </Grid>
                  </section>
                </Grid>
                <Grid item xs={12} lg={3}>
                  <Box boxShadow={5}>
                    <Card>
                      <CardContent style={{ padding: 30 }}>
                        <Typography
                          style={{ marginBottom: 10 }}
                          color="textPrimary"
                          variant="h6"
                        >
                          ABOUT ME
                        </Typography>
                        <img
                          src={avatarImage}
                          className={classes.avatarImage}
                        />

                        <Typography
                          className={classes.bioStyle}
                          color="textPrimary"
                          style={{ fontSize: 19 }}
                        >
                          Hail! i'm Renate! I'm a British / Portuguese human
                          (born and raised on little Guernsey), with a huge love
                          for friends, family, travel, fitness and just life in
                          general, and always have a lot to say. <br />
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
                        <Grid container spacing={2}>
                          {renderStarPosts(data.starPosts)}
                        </Grid>
                        <div style={{ marginTop: 40 }}>
                          <CategoryList categories={data.categories} />
                        </div>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              </Grid>
            </HomeLayout>
          );
        }}
      </Query>
    </ErrorBoundary>
  );

  function renderFeaturePost(post) {
    if (post) {
      return (
        <FeaturePostHome
          publishedAt={get(post, "post.published_at")}
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
  }

  function renderStarPosts(posts: any) {
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
    return posts[0].posts.map((post: any) => {
      return (
        <StarPost
          id={post.id}
          publishedAt={post.published_at}
          categoryID={post.category.id}
          category={post.category.title}
          img={post.image[0].url}
          title={post.title}
        />
      );
    });
  }

  function renderLatestPosts(posts: any) {
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
        <Grid item xl={4} lg={6} xs={12}>
          <LatestPostCard
            id={get(post, "id")}
            image={get(post, "image[0].url")}
            title={get(post, "title")}
            category={get(post, "category.title")}
            categoryID={get(post, "category.id")}
          />
        </Grid>
      );
    });
  }
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
  return { userAgent };
};

export default Home;

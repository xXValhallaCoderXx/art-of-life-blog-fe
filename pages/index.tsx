import { NextPage } from "next";
import Link from "next/link";
import startCase from "lodash/startCase";
import get from "lodash/get";
import { FETCH_HOME_DATA } from "shared/queries/posts";

import { HomeLayout } from "shared/components/layouts";
import {
  FeaturePostHome,
  LatestPostCard,
  StarPost
} from "shared/components/blog";
import { ErrorBoundary } from "shared/components";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Query from "shared/components/query-component";
import { colors } from "shared/styles/_colors";

const useStyles = makeStyles(theme => ({
  large: {
    border: `5px solid ${colors.darkAccent}`,
    margin: "0 auto",
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  stickyPostTitle: {
    marginTop: 20
  },
  bioStyle: {
    marginTop: 20,
    padding: 5
  },
  blogsSection: {
    marginTop: 30,
    marginLeft: "1vh"
  },
  latestPostTitle: {
    marginTop: 50,
    marginBottom: 30
  }
}));

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => {
  // @ts-ignore
  const classes = useStyles();
  const avatarImage = require("shared/images/portrait-image.jpg");
  return (
    <ErrorBoundary>
      <Query query={FETCH_HOME_DATA}>
        {({ data }: any) => {
          console.log("HOME: ", data);
          const { featurePost } = data;
          return (
            <HomeLayout>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={9}>
                  <section id="feature-post">
                    <FeaturePostHome
                      image={featurePost.post.image[0].url}
                      category={featurePost.post.category.title}
                      title={featurePost.post.title}
                      id={featurePost.post.id}
                    />
                  </section>
                  <section className={classes.blogsSection} id="blogs">
                    <Grid container direction="column" spacing={3}>
                      <Typography
                        className={classes.latestPostTitle}
                        variant="h3"
                        color="textPrimary"
                      >
                        Latest Posts
                      </Typography>
                      <Grid container alignItems="stretch" spacing={5}>
                        {renderLatestPosts(data.posts)}
                      </Grid>
                    </Grid>
                  </section>
                </Grid>
                <Grid item xs={12} lg={3}>
                  <Box boxShadow={10}>
                    <Card>
                      <CardContent>
                        <Avatar src={avatarImage} className={classes.large} />
                        <Typography
                          className={classes.bioStyle}
                          color="primary"
                          align="center"
                          variant="subtitle2"
                        >
                          33 Yr old British / Portuguese (born and raised on
                          little Guernsey), with a huge love for friends,
                          family, travel, fitness and just life in general.
                        </Typography>
                        <Typography
                          className={classes.stickyPostTitle}
                          color="primary"
                          variant="h6"
                        >
                          Sticky Posts
                        </Typography>
                        <Grid container>{renderStarPosts(data.starPosts)}</Grid>
                        <Typography
                          className={classes.stickyPostTitle}
                          color="primary"
                          variant="h6"
                        >
                          Categories
                        </Typography>
                        {renderCategories(data.categories)}
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

  function renderCategories(categories) {
    return categories.map((category, index) => {
      return (
        <Typography key={index} color="primary" variant="h6">
          <Link href={`/category/${category.id}`}>
            <a>{startCase(category.title)}</a>
          </Link>
        </Typography>
      );
    });
  }

  function renderStarPosts(posts: any) {
    return posts[0].posts.map((post: any) => {
      return <StarPost post={post} />;
    });
  }

  function renderLatestPosts(posts: any) {
    return posts.map((post, index) => {
      return (
        <Grid item xl={4} lg={6} xs={12}>
          <LatestPostCard
            id={get(post, "id")}
            image={get(post, "image[0].url")}
            title={get(post, "title")}
            category={get(post, "category.title")}
          />
        </Grid>
      );
    });
  }
};

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
  return { userAgent };
};

export default Home;

import { NextPage } from "next";
import Router from "next/router";
import { FETCH_HOME_DATA } from "shared/queries/posts";

import { HomeLayout } from "shared/components/layouts";
import { FeaturePostHome, LatestPostCard } from "shared/components/blog";

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
    marginTop: 30
  },
  latestPostTitle: {
    marginTop: 50,
    marginBottom: 30,
    color: colors.lightShade
  }
}));

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => {
  // @ts-ignore
  const classes = useStyles();
  const avatarImage = require("shared/images/portrait-image.jpg");
  return (
    <Query query={FETCH_HOME_DATA}>
      {({ data }: any) => {
        console.log("AT:A", data);
        const { post } = data.featurePosts[0];
        console.log("POST: ", post);
        return (
          <HomeLayout>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8} md={8} lg={9}>
                <section id="feature-post">
                  <FeaturePostHome
                    image={post.image[0].url}
                    category={post.category.name}
                    title={post.title}
                  />
                </section>
                <section className={classes.blogsSection} id="blogs">
                  <Grid container direction="column" spacing={3}>
                    <Typography
                      className={classes.latestPostTitle}
                      align="left"
                      variant="h3"
                    >
                      Latest Posts
                    </Typography>
                    <Grid container direction="row" spacing={10}>{renderLatestPosts(data.posts)}</Grid>
                  </Grid>
                </section>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={3}>
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
                      33 Yr old British / Portuguese (born and raised on little
                      Guernsey), with a huge love for friends, family, travel,
                      fitness and just life in general.
                    </Typography>
                    <Typography
                      className={classes.stickyPostTitle}
                      color="primary"
                      variant="subtitle1"
                    >
                      {renderStarPosts(data.starPosts)}
                    </Typography>
                  </CardContent>
                </Card>
             </Box>
              </Grid>
            </Grid>
          </HomeLayout>
        );
      }}
    </Query>
  );
  function renderStarPosts(posts: any) {
    return posts.map((post: any) => {
      const { id, title } = post.post;
      return <div onClick={() => Router.push(`/article/${id}`)}>{title}</div>;
    });
  }

  function renderLatestPosts(posts: any) {
    return posts.map((post, index) => {
      return <Grid item><LatestPostCard image={post.image[0].url} title={post.title} category={post.category.name}/></Grid>;
    });
  }
};

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
  return { userAgent };
};

export default Home;

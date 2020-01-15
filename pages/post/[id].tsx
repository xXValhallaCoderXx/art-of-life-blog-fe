import { useRouter } from "next/router";
import Link from "next/link";
import { HomeLayout } from "shared/components/layouts";
import Query from "shared/components/query-component";
import { FETCH_POST } from "shared/queries/posts";
import ReactMarkdown from "react-markdown";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import startCase from "lodash/startCase";

// import startCase from "lodash-es/startCase";

const useStyles = makeStyles(theme => ({
  cardWrapper: {
    padding: 30
  },
  imageWrapper: {
    marginTop: 50,
    marginBottom: 30,
    objectFit: "cover",
    objectPosition: "50% 0%",
    width: "100%",
    height: 400
  },
  title: {
    fontWeight: 800
  }
}));

const Post = () => {
  const router = useRouter();
  const { id }: any = router.query;
    // @ts-ignore
    const classes = useStyles();
  return (
    <Query query={FETCH_POST} variables={{ id: parseInt(id) }}>
      {({ data }: any) => {
        console.log("data: ", data);
        return (
          <HomeLayout>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8} md={8} lg={9}>
                <Card>
                  <CardContent className={classes.cardWrapper}>
                    <Typography
                      color="primary"
                      align="left"
                      variant="h5"
                    >
                      <Link
                        href={`/article/category/${data.post.category.name}`}
                      >
                        {startCase(data.post.category.name)}
                      </Link>
                    </Typography>
                    <Typography className={classes.title} color="primary" align="center" variant="h2">
                      {data.post.title}
                    </Typography>
                    <img className={classes.imageWrapper} src={data.post.image[0].url} />
                    <ReactMarkdown source={data.post.content} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </HomeLayout>
        );
      }}
    </Query>
  );
};

export default Post;

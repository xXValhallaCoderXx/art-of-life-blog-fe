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

import { parseISO, format } from "date-fns";
import startCase from "lodash/startCase";
import "github-markdown-css";

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
        console.log("DATA: ", data);
        return (
          <HomeLayout>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8} md={8} lg={9}>
                <Card>
                  <CardContent className={classes.cardWrapper}>
                    <Typography color="primary" align="left" variant="h5">
                      <Link
                        href={`/article/category/${data.post.category.name}`}
                      >
                        <a style={{textDecoration: "none"}}>{startCase(data.post.category.name)}</a>
                      </Link>
                      <span style={{ marginLeft: 5, marginRight: 5 }}>-</span>
                      <Link
                        href={`/article/category/${data.post.sub_category.title}`}
                      >
                        <a style={{textDecoration: "none"}}>{startCase(data.post.sub_category.title)}</a>
                      </Link>
                    </Typography>
                    <Typography
                      className={classes.title}
                      color="primary"
                      align="center"
                      variant="h2"
                    >
                      {data.post.title}
                    </Typography>
                    <img
                      className={classes.imageWrapper}
                      src={data.post.image[0].url}
                    />
                    <div className={"markdown-body"}>
                      <ReactMarkdown source={data.post.content} />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={3}>
                <Card>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="primary"
                      align="left"
                      variant="h6"
                    >
                      Related Articles -{" "}
                      {startCase(data.post.sub_category.title)}
                    </Typography>
                    <div style={{ marginTop: 20, marginBottom: 30 }}>
                      {handleRelatedArticles(data.post.sub_category.posts)}
                    </div>
                    <Typography
                      className={classes.title}
                      color="primary"
                      align="left"
                      variant="h6"
                    >
                      Countries
                    </Typography>
                    <div style={{ marginTop: 5 }}>
                      {handleSubCategories(
                        data.travelCategories,
                        data.post.sub_category.title
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </HomeLayout>
        );
      }}
    </Query>
  );

  function handleSubCategories(countries, current) {
    const filteredCountries = countries.filter(
      country => country.title !== current
    );
    return filteredCountries.map((country, index) => {
      return (
        <Typography key={index} color="primary" align="left" variant="subtitle2">
          {startCase(country.title)}
        </Typography>
      );
    });
  }

  function handleRelatedArticles(posts) {
    const filteredArtciles = posts.filter(post => post.id !== id);
    if (filteredArtciles.length === 0) {
      return <div>No Adventures</div>;
    } else {
      return filteredArtciles.map((article, index) => {
        const result = parseISO(article.published_at);
        return (
          <Typography key={index} color="primary" align="left" variant="subtitle2">
            {article.title} - {format(result, "dd/MM/yyyy")}
          </Typography>
        );
      });
    }
  }
};

export default Post;
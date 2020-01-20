import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import upperCase from "lodash/upperCase";
import Query from "shared/components/query-component";
import { Typography } from "@material-ui/core";
import { FETCH_SUBCATEGORY_POSTS } from "shared/queries/posts";

import { HomeLayout } from "shared/components/layouts";
import { LatestPostCard, CategoryList } from "shared/components/blog";
import { Grid, Card, CardContent } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  postWrapper: {
    padding: 10,
    [theme.breakpoints.down("md")]: {
      padding: 0,
      marginTop: 25
    }
  },
  text: {
    marginBottom: 20,
    "&:hover": {
      cursor: "pointer"
    }
  },
}));

const CategoryPage = () => {
  const router = useRouter();
  // @ts-ignore
  const classes = useStyles();
  const { id }: any = router.query;
  return (
    <Query query={FETCH_SUBCATEGORY_POSTS} variables={{ id }}>
      {({ data }: any) => {
        return (
          <HomeLayout>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8} md={8} lg={9}>
                <Card>
                  <CardContent>
                    <Typography color="primary" align="left" variant="h5" className={classes.text}>
                      <a
                        onClick={() =>
                          router.push(
                            `/category/${data.subCategory.category.id}`
                          )
                        }
                      >
                        {upperCase(data.subCategory.category.title)}
                      </a>
                      <span style={{ marginLeft: 5, marginRight: 5 }}>-</span>
                      <a
                        onClick={() =>
                          router.push(
                            `/category/sub-category/${data.subCategory.id}`
                          )
                        }
                      >
                        {upperCase(data.subCategory.title)}
                      </a>
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                      {data.subCategory.description}
                    </Typography>
                  </CardContent>
                </Card>
                <Grid container style={{ marginTop: 50 }}>
                  {renderSubCategoryPosts(data.subCategory.posts)}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={3} spacing={3}>
                <Card>
                  <CardContent>
                    <CategoryList categories={data.categories} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </HomeLayout>
        );
      }}
    </Query>
  );

  function renderSubCategoryPosts(posts) {
    return posts.map((post, index) => {
      return (
        <Grid sm={12} md={4} className={classes.postWrapper}>
          <LatestPostCard
            id={post.id}
            title={post.title}
            categoryID={post.category.id}
            category={post.category.title}
            image={post.image[0].url}
          />
        </Grid>
      );
    });
  }
};

export default CategoryPage;

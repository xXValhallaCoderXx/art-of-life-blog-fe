import { useRouter } from "next/router";

import Link from "next/link";
import startCase from "lodash/startCase";
import get from "lodash/get";
import Query from "shared/components/query-component";
import { makeStyles } from "@material-ui/core/styles";
import { FETCH_CATEGORY_SUBCATEGORY_POSTS } from "shared/queries/posts";

import { HomeLayout } from "shared/components/layouts";
import { LatestPostCard } from "shared/components/blog";

import { Grid, Typography, Card, CardContent } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  subCategoryWrapper: {
    padding: 20
  },
  subCategoryTitle: {
    marginBottom: 30
  },
  categoryDescription: {
    marginLeft: 20,
    marginTop: 20
  },
  categoryTitle: {
    marginBottom: 20
  },
  categoryLink: {
    marginBottom: 10
  }
}));

const CategoryPage = () => {
  // @ts-ignore
  const classes = useStyles();
  const router = useRouter();
  const { id }: any = router.query;
  return (
    <Query query={FETCH_CATEGORY_SUBCATEGORY_POSTS} variables={{ id }}>
      {({ data }: any) => {
        console.log("CATEGORIES", data);
        return (
          <HomeLayout>
            <Grid container spacing={5}>
              <Grid item lg={9}>
                <Typography variant="h3">
                  {startCase(data.category.title)}
                </Typography>
                <Typography
                  className={classes.categoryDescription}
                  variant="h5"
                >
                  {startCase(data.category.description)}
                </Typography>
                {renderSubcategories(data.category.sub_categories)}
              </Grid>

              <Grid item lg={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" className={classes.categoryTitle}>
                      Categories
                    </Typography>
                    {renderCategories(data.categories)}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </HomeLayout>
        );
      }}
    </Query>
  );

  function renderCategories(categories) {
    return categories.map((category, index) => {
      return (
        <Typography
          onClick={() => router.push(`/category/${category.id}`)}
          variant="h6"
          key={index}
          className={classes.categoryTitle}
        >
          {startCase(category.title)}
        </Typography>
      );
    });
  }

  function renderSubcategories(subCategories) {
    return subCategories.map((subCategory, index) => {
      return (
        <Grid className={classes.subCategoryWrapper}>
          <Typography variant="h4" className={classes.subCategoryTitle}>
            <Link href={`/category/sub-category/${subCategory.id}`}>
              <a>{startCase(subCategory.title)}</a>
            </Link>
          </Typography>
          <Grid container alignItems="stretch" spacing={5}>
            {renderPosts(subCategory.posts)}
          </Grid>
        </Grid>
      );
    });
  }

  function renderPosts(posts) {
    return posts.map((post, index) => {
      return (
        <Grid item xl={4} lg={6} xs={12}>
          <LatestPostCard
            id={get(post, "id")}
            image={get(post, "image[0].url")}
            title={get(post, "title")}
            category={get(post, "category.name")}
          />
        </Grid>
      );
    });
  }
};

export default CategoryPage;

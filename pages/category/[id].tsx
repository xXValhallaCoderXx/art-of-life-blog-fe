import { useRouter } from "next/router";

import Link from "next/link";
import startCase from "lodash/startCase";
import get from "lodash/get";
import Query from "shared/components/query-component";
import { makeStyles } from "@material-ui/core/styles";
import { FETCH_CATEGORY_SUBCATEGORY_POSTS } from "shared/queries/posts";

import { HomeLayout } from "shared/components/layouts";
import { LatestPostCard } from "shared/components/blog";

import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  subCategoryWrapper: {
    padding: 20
  },
  subCategoryTitle: {
    marginBottom: 30
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
            <Typography variant="h3">
              {startCase(data.category.title)}
            </Typography>
            {renderSubcategories(data.category.sub_categories)}
          </HomeLayout>
        );
      }}
    </Query>
  );

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

import { useRouter } from "next/router";

import { parseISO, format } from "date-fns";
import startCase from "lodash/startCase";
import get from "lodash/get";
import Query from "shared/components/query-component";
import { makeStyles } from "@material-ui/core/styles";
import { FETCH_CATEGORY_SUBCATEGORY_POSTS } from "shared/queries/posts";

import { HomeLayout } from "shared/components/layouts";
import { LatestPostCard, CategoryList } from "shared/components/blog";

import { Grid, Typography, Card, CardContent, Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  subCategoryWrapper: {
    marginTop: "2vh"
  },
  subCategoryTitle: {
    color: theme.palette.primary.main,
    textTransform: "uppercase",
    marginBottom: 20,
    "&:hover": {
      cursor: "pointer"
    }
  },
  viewAllPosts: {
    textTransform: "uppercase",
    color: theme.palette.primary.main,
    marginTop: 40,
    "&:hover": {
      cursor: "pointer"
    }
  },
  subCategoryDescription: {
    marginTop: 20,
    marginBottom: 20
  },
  categoryDescription: {
    marginTop: 20
  },
  categoryTitle: {
    marginBottom: 20
  },
  categoryLink: {
    marginBottom: 10
  },
  cardWrapper: {
    marginTop: 30
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
        return (
          <HomeLayout>
            <Grid container spacing={5}>
              <Grid item xs={12} lg={9}>
                <Typography variant="h3" color="primary">
                  {startCase(data.category.title)}
                </Typography>
                <Typography
                  className={classes.categoryDescription}
                  color="textPrimary"
                  variant="body1"
                >
                  {data.category.description}
                </Typography>
                {renderSubcategories(data.category.sub_categories)}
              </Grid>

              <Grid item xs={12} lg={3}>
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

  function renderSubcategories(subCategories) {
    return subCategories.map((subCategory, index) => {
      return (
        <Box boxShadow={10}>
          <Card className={classes.cardWrapper}>
            <CardContent>
              <Grid className={classes.subCategoryWrapper}>
                <Typography variant="h4" className={classes.subCategoryTitle}>
                  <a
                    onClick={() =>
                      router.push(`/category/sub-category/${subCategory.id}`)
                    }
                  >
                    {startCase(subCategory.title)}
                  </a>
                </Typography>
                <Typography
                  className={classes.subCategoryDescription}
                  color="textSecondary"
                  variant="body1"
                >
                  {subCategory.description}
                </Typography>
                <Grid container alignItems="stretch" spacing={5}>
                  {renderPosts(subCategory.posts)}
                </Grid>
                <Typography
                  align="center"
                  variant="h5"
                  className={classes.viewAllPosts}
                >
                  <a
                    onClick={() =>
                      router.push(`/category/sub-category/${subCategory.id}`)
                    }
                  >
                    View All {subCategory.title} Posts
                  </a>
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      );
    });
  }

  function renderPosts(posts) {
    return posts.map((post, index) => {
      return (
        <Grid item xl={4} lg={4} md={4} xs={12}>
          <LatestPostCard
            id={get(post, "id")}
            image={get(post, "image[0].url")}
            title={get(post, "title")}
            category={get(post, "category.title")}
            categoryID={get(post, "category.id")}
            publishedAt={get(post, "published_at")}
            shadow={0}
          />
        </Grid>
      );
    });
  }
};

export default CategoryPage;

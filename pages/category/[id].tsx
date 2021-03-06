import { useRouter } from "next/router";

import startCase from "lodash/startCase";
import get from "lodash/get";
import { makeStyles } from "@material-ui/core/styles";
import {
  FETCH_CATEGORY_SUBCATEGORY_POSTS,
  FETCH_CATEGORIES_ID,
} from "shared/queries/posts";
import { initializeApollo } from "shared/utils/apollo-client";
import { HomeLayout } from "shared/components/layouts";
import { LatestPostCard, CategoryList } from "shared/components/blog";

import { Grid, Typography, Card, CardContent, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  subCategoryWrapper: {
    marginTop: "2vh",
  },
  subCategoryTitle: {
    color: theme.palette.primary.main,
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.primary.dark,
    },
  },
  viewAllPosts: {
    textTransform: "uppercase",
    color: theme.palette.primary.main,
    marginTop: 40,
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.primary.dark,
    },
  },
  subCategoryDescription: {
    marginTop: 20,
    marginBottom: 20,
  },
  categoryDescription: {
    marginTop: 10,
  },
  categoryTitle: {
    marginBottom: 20,
  },
  categoryLink: {
    marginBottom: 10,
  },
  cardWrapper: {
    marginTop: 30,
  },
}));

const SubCategoryPage = ({ data }) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <HomeLayout>
      <Grid container spacing={5}>
        <Grid item xs={12} lg={9}>
          <Card>
            <CardContent>
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
            </CardContent>
          </Card>
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

  function renderSubcategories(subCategories) {
    return subCategories.map((subCategory, index) => {
      return (
        <Box boxShadow={0} key={index}>
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
                  color="textPrimary"
                  variant="body1"
                >
                  {subCategory.description}
                </Typography>
                <Grid container alignItems="stretch" spacing={5}>
                  {renderPosts(subCategory.posts)}
                </Grid>
                <Typography
                  align="center"
                  variant="h6"
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
        <Grid item xl={4} lg={4} md={4} xs={12} key={index}>
          <LatestPostCard
            id={get(post, "id")}
            image={get(post, "image[0].url")}
            title={get(post, "title")}
            category={get(post, "category.title")}
            categoryID={get(post, "category.id")}
            publishedAt={get(post, "updated_at")}
            shadow={0}
          />
        </Grid>
      );
    });
  }
};

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const res = await apolloClient.query({
    query: FETCH_CATEGORIES_ID,
  });
  if (res.data.categories && res.data.categories.length > 0) {
    const paths = res.data.categories.map((item) => ({
      params: { id: item.id },
    }));
    return { paths, fallback: false };
  }

  return { paths: [], fallback: false };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();

  const res = await apolloClient.query({
    query: FETCH_CATEGORY_SUBCATEGORY_POSTS,
    variables: { id: parseInt(params.id) },
  });

  return {
    props: { data: res.data },
  };
}

export default SubCategoryPage;

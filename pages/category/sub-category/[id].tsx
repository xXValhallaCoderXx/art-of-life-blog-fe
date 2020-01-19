import { useRouter } from "next/router";

import Link from "next/link";
import startCase from "lodash/startCase";
import Query from "shared/components/query-component";
import { Typography } from "@material-ui/core";
import { FETCH_SUBCATEGORY_POSTS } from "shared/queries/posts";

import { HomeLayout } from "shared/components/layouts";

import { Grid } from "@material-ui/core";

const CategoryPage = () => {
  const router = useRouter();
  const { id }: any = router.query;
  return (
    <Query query={FETCH_SUBCATEGORY_POSTS} variables={{ id }}>
      {({ data }: any) => {
        return (
          <HomeLayout>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8} md={8} lg={9}>
                <Typography color="primary" align="left" variant="h5">
                  <Link
                    href={`/category/${data.subCategory.category.id}`}
                  >
                    <a style={{ textDecoration: "none" }}>
                      {startCase(data.subCategory.category.title)}
                    </a>
                  </Link>
                  <span style={{ marginLeft: 5, marginRight: 5 }}>-</span>
                  <Link href={`/category/sub-category/${data.subCategory.id}`}>
                    <a style={{ textDecoration: "none" }}>
                      {startCase(data.subCategory.title)}
                    </a>
                  </Link>
                </Typography>
                <Grid container>
                  <ul>{renderSubCategoryPosts(data.subCategory.posts)}</ul>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={3}>
                iDE
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
        <li key={index}>
          <Link href={`/article/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      );
    });
  }
};

export default CategoryPage;

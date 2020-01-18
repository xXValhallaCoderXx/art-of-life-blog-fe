import { useRouter } from "next/router";

import Link from "next/link";
import Query from "shared/components/query-component";
import { FETCH_SUBCATEGORY_POSTS } from "shared/queries/posts";

import { HomeLayout } from "shared/components/layouts";

import { Grid } from "@material-ui/core";

const CategoryPage = () => {
  const router = useRouter();
  const { id }: any = router.query;
  return (
    <Query query={FETCH_SUBCATEGORY_POSTS} variables={{ id }}>
      {({ data }: any) => {
        console.log("CATEGORIES", data);
        return (
          <HomeLayout>
            <Grid container direction="row" spacing={10}>
              <ul>{renderSubCategoryPosts(data.subCategory.posts)}</ul>
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

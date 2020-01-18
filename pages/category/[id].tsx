import { useRouter } from "next/router";

import Link from "next/link";
import Query from "shared/components/query-component";
import { FETCH_CATEGORY_POSTS } from "shared/queries/posts";

import { HomeLayout } from "shared/components/layouts";

import { Grid } from "@material-ui/core";

const CategoryPage = () => {
  const router = useRouter();
  const { id }: any = router.query;
  return (
    <Query query={FETCH_CATEGORY_POSTS} variables={{ id }}>
      {({ data }: any) => {
        console.log("CATEGORIES", data);
        return (
          <HomeLayout>
            <Grid container direction="row" spacing={10}>
              Hello
            </Grid>
          </HomeLayout>
        );
      }}
    </Query>
  );
};

export default CategoryPage;

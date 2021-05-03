import Link from "next/link";
import { FETCH_CATEGORY_SUBCATEGORY } from "shared/queries/posts";
import { initializeApollo } from "shared/utils/apollo-client";
import { HomeLayout } from "shared/components/layouts";
import { Grid } from "@material-ui/core";

const CategoryIndex = ({ data }) => {
  return (
    <HomeLayout>
      <Grid container direction="row" spacing={10}>
        {renderCategories(data.categories)}
      </Grid>
    </HomeLayout>
  );

  function renderCategories(categories) {
    return categories.map((category, index) => {
      let content;
      if (category.sub_categories.length !== 0) {
        let subContent = category.sub_categories.map((subCategory, index) => {
          return (
            <li key={index}>
              <Link href={`/category/sub-category/${subCategory.id}`}>
                <a>{subCategory.title}</a>
              </Link>
            </li>
          );
        });
        content = (
          <div>
            <Link href={`/category/${category.id}`}>
              <a>{category.name}</a>
            </Link>
            <ul>{subContent}</ul>
          </div>
        );
      } else {
        content = (
          <Link href={`/category/${category.id}`}>
            <a>{category.name}</a>
          </Link>
        );
      }
      return (
        <Grid item key={index}>
          {content}
        </Grid>
      );
    });
  }
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const res = await apolloClient.query({
    query: FETCH_CATEGORY_SUBCATEGORY,
  });

  return {
    props: {
      data: res.data,
    },
    unstable_revalidate: 1,
  };
}

export default CategoryIndex;

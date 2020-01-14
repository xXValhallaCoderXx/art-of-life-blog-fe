import { useRouter } from "next/router";
import { HomeLayout } from "shared/components/layouts";
import Query from "shared/components/query-component";
import { FETCH_POSTS_BY_CATEGORY } from "shared/queries/posts";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const Post = () => {
  const router = useRouter();
  const { category } = router.query;
  return (
    <Query query={FETCH_POSTS_BY_CATEGORY} variables={{ category }}>
      {({ data }: any) => {
        return (
          <HomeLayout>
            <Typography color="primary" align="left" variant="h3">
              {category} - Blogs
            </Typography>
            <Container>{renderBlogs(data.articles)}</Container>
          </HomeLayout>
        );
      }}
    </Query>
  );

  function renderBlogs(articles: any) {
    return articles.map((article: any, index: any) => {
      return (
        <div key={index} onClick={() => router.push(`/article/${article.id}`)}>
          <Typography color="primary" align="left" variant="h6">
            {article.title}
          </Typography>
        </div>
      );
    });
  }
};

export default Post;

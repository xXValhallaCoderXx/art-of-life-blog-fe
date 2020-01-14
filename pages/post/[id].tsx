import { useRouter } from "next/router";
import Link from "next/link";
import { HomeLayout } from "shared/components/layouts";
import Query from "shared/components/query-component";
import { FETCH_POST } from "shared/queries/posts";
import ReactMarkdown from "react-markdown";
import Typography from "@material-ui/core/Typography";

const Post = () => {
  const router = useRouter();
  const { id }: any = router.query;
  return (
    <Query query={FETCH_POST} variables={{ id: parseInt(id) }}>
      {({ data }: any) => {
        return (
          <HomeLayout>
            <Typography color="primary" align="left" variant="subtitle1">
              <Link href={`/article/category/${data.article.category.name}`}>
                {data.article.category.name}
              </Link>
            </Typography>
            <Typography color="primary" align="left" variant="h3">
              {data.article.title}
            </Typography>
            <ReactMarkdown source={data.article.content} />
          </HomeLayout>
        );
      }}
    </Query>
  );
};

export default Post;

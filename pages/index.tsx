import QueryComponent from "../shared/components/query-component";
import { FETCH_POST } from "../shared/queries/posts";

const IndexPage = () => {
  return (
    <QueryComponent query={FETCH_POST}>
      {({ data }: any) => {
        return (
          <div>
            {data.post.title}
            <img src={`${process.env.API_URL}/${data.post.image[0].url}`} />
          </div>
        );
      }}
    </QueryComponent>
  );
};

export default IndexPage;

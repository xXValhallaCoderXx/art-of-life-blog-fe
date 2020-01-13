import gql from "graphql-tag";

export const FETCH_POST = gql`
query {
  post(id:1){
    title
    id
    content
    image {
      url
    }
  }
}
`;

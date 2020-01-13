import gql from "graphql-tag";

export const FETCH_ARTICLE = gql`
  query {
    post(id: 1) {
      id
      title
    }
  }
`;

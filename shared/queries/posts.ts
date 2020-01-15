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

export const FETCH_POSTS_BY_CATEGORY = gql`
query ArticleCategories($category: String!) {
  posts(where: {
    category: {name: $category}
  }) {
    id
    title
  }
}
`;

export const FETCH_HOME_DATA = gql`
  query homePageArticles {
    posts(limit: 3, sort: "published_at:DESC") {
      id
      title
      published_at
      category {
          name
        }
      image {
        url
      }
    }
    featurePosts {
      post {
        id
        title
        category {
          name
        }
        image {
          url
        }
      }
    }
    starPosts {
      post {
        id
        title
        image {
          url
        }
      }
    }
  }
`;
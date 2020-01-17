import gql from "graphql-tag";

export const FETCH_POST = gql`
  query FetchPosts($id: ID!) {
    post(id: $id) {
      title
      id
      content
      category {
        name
      }
      image {
        url
      }
      sub_category {
        title
        posts {
          id
          title
          published_at
        }
      }
    }
    travelCategories: subCategories {
      title
    }
  }
`;

export const FETCH_POSTS_BY_CATEGORY = gql`
  query ArticleCategories($category: String!) {
    posts(where: { category: { name: $category } }) {
      id
      title
    }
  }
`;

export const FETCH_HOME_DATA = gql`
  query homePageArticles {
    posts(limit: 3, sort: "created_at:DESC") {
      id
      title
      published_at
      image {
        url
      }
      category {
        name
      }
    }
    featurePost(id: 1) {
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
      posts {
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
  }
`;

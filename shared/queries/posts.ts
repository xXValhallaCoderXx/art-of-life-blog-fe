import gql from "graphql-tag";

export const FETCH_CATEGORY_SUBCATEGORY = gql`
  query {
    categories {
      name
      id
      sub_categories {
        title
        id
      }
    }
  }
`;

export const FETCH_SUBCATEGORY_POSTS = gql`
  query FetchSubCategoryPosts($id: ID!) {
    subCategory(id: $id) {
      id
      title
      category {
        id
        title
      }
      posts {
        id
        title
      }
    }
  }
`;

export const FETCH_CATEGORY_SUBCATEGORY_POSTS = gql`
  query FetchCategoryPosts($id: ID!) {
    category(id: $id) {
      id
      title
      description
      sub_categories {
        id
        title
        posts(limit: 3, sort: "created_at:DESC") {
          id
          title
        }
      }
    }
    categories: categories(where: { id_ne: $id }) {
      id
      title
    }
  }
`;

export const FETCH_POST = gql`
  query FetchPosts($id: ID!) {
    post(id: $id) {
      id
      title
      content
      sub_category {
        id
        title
        posts {
          id
          title
          published_at
        }
      }
      category {
        id
        title
        sub_categories {
          id
          title
        }
      }
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
        title
      }
    }
    featurePost(id: 1) {
      post {
        id
        title
        category {
          title
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
          title
        }
        image {
          url
        }
      }
    }
    categories {
    id
    title
  }
  }
`;

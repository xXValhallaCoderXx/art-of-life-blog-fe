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
      description
      category {
        id
        title
      }
      posts {
        id
        title
        updated_at
        category {
          id
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

export const FETCH_CATEGORY_SUBCATEGORY_POSTS = gql`
  query FetchCategoryPosts($id: ID!) {
    category(id: $id) {
      id
      title
      description
      sub_categories {
        id
        title
        description
        posts(limit: 3, sort: "created_at:DESC") {
          id
          title
          updated_at
          image {
            url
          }
          category {
            title
          }
        }
      }
    }
    # categories: categories(where: { id_ne: $id }) {
    #   id
    #   title
    # }
    categories: categories {
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
      image {
        url
      }
      sub_category {
        id
        title
        posts {
          id
          title
          updated_at
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
    categories {
      id
      title
    }
  }
`;

export const FETCH_POSTS_ID = gql`
  query {
    posts {
      id
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
      updated_at
      image {
        url
      }
      category {
        id
        title
      }
    }
    featurePost(id: 1) {
      post {
        id
        title
        updated_at
        category {
          id
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
        updated_at
        category {
          id
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

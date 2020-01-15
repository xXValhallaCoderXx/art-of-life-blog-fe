import gql from "graphql-tag";

export const FETCH_POST = gql`
query FetchPosts($id: ID!) {
  post(id:$id){
    title
    id
    content
    category {
      name
    }
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
      image {
        url
      }
      category {
        name
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
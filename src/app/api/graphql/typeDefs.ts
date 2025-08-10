import { gql } from "graphql-request";

//type Query-> for read & type Mutations -> for Create, Update and Delete.
// '!' it means this is necessary

const typeDefs = gql`
  type Query {
    hello1: String
    hello2: String
    helloArray: [String]
    getBlog(id: String): Blog
    getBlogs(q: String): [Blog]
    allBlogs: [Blog]
    getCurrentUser: User
    getCurrentUserBlogs: [Blog]
  }

  type Mutation {
    createBlog(title: String!, content: String!, imageUrl: String!): Response!
    deleteBlog(id: String!): Response!
    updateBlog(
      id: String!
      title: String
      content: String
      imageUrl: String
    ): Response!
    signUpUser(name: String!, email: String!, password: String!): Response!
    loginUser(email: String!, password: String!): Response!
  }

  type Blog {
    id: String!
    title: String!
    content: String!
    imageUrl: String!
  }

  type Response {
    success: Boolean
    message: String
  }

  type User {
    id: String
    name: String
    email: String
  }
`;

export default typeDefs;

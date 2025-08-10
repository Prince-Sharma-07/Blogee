import getUserFromCookies from "@/helper";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import {
  createBlog,
  deleteBlog,
  filterBlogs,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "./resolvers/blog";
import { getCurrentUserBlogs, loginUser, signUpUser } from "./resolvers/user";
import typeDefs from "./typeDefs";

// by default fields are optional and return null when not present, but to make them important(mandatory) use '!' mark.

const resolvers = {
  Query: {
    // During Query all functions can execute parallely
    allBlogs: getAllBlogs,
    getBlog: getBlogById,
    getBlogs: filterBlogs,
    getCurrentUser: getUserFromCookies,
    getCurrentUserBlogs
  },
  Mutation: {
    // In Mutation all functions run after one another to ensure atomicity. eg. Bank payment
    createBlog,
    deleteBlog,
    updateBlog,
    signUpUser,
    loginUser,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };


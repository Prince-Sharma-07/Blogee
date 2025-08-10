// import { GraphQLClient } from "graphql-request";

// const gqlClient = new GraphQLClient('http://localhost:3000/api/graphql')
// export default gqlClient;

import { GraphQLClient } from "graphql-request";

const getGraphQLEndpoint = () => {
  // Server-side (during SSR/build)
  if (typeof window === 'undefined') {
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}/api/graphql`;
    }
    return 'http://localhost:3000/api/graphql';
  }
  
  // Client-side
  return 'http://localhost:3000/api/graphql';
};

const gqlClient = new GraphQLClient(getGraphQLEndpoint());

export default gqlClient;
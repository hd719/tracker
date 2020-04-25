// Short way
// export default (req, res) => {
//   res.status(200).json({
//     test: "Hello Level Up",
//   });
// };

// Long Way
// export default (req, res) => {
//   res.setHeader('Content-Type', 'application/json')
//   res.statusCode = 200
//   res.end(JSON.stringify({
//     test: "Hello Level Up"
//   }))
// }

import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`;

const resolvers = {
  Query: {
    sayHello: () => {
      return "Hello Level Up!";
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

// nextjs setting, turning off bodyparser for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });

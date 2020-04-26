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
import connectDb from "../../lib/mongoose";

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

const server = apolloServer.createHandler({ path: "/api/graphql" });

// connects mongo to our graphql api
export default connectDb(server);

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
import { mergeResolvers, mergeTypeDefs } from "graphql-toolkit";
import connectDb from "../../lib/mongoose";
import { habitsResolvers } from "../api/habits/resolvers";
import { habitsMutations } from "../api/habits/mutations";
import Habits from "../api/habits/Habits.graphql";

const fakeTypeDefs = gql`
  type Query {
    sayHello: String
  }
`;

const fakeResolvers = {
  Query: {
    sayHello: () => {
      return "Hello Level Up!";
    },
  },
};

const resolvers = mergeResolvers([
  fakeResolvers,
  habitsResolvers,
  habitsMutations,
]);
const typeDefs = mergeTypeDefs([fakeTypeDefs, Habits]);

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

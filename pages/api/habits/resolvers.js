import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

export const habitsResolvers = {
  Query: {
    async habits() {
      console.log("habits");
      return [
        {
          _id: "1",
          name: "Make my bed",
        },
      ];
    },
  },

  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); //value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
};

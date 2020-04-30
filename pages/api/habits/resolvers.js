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
};

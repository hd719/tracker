export const habitsResolvers = {
  Query: {
    async getHabit() {
      console.log("get habit");
      return [
        {
          _id: "id",
          name: "make bed",
        },
      ];
    },
  },
};

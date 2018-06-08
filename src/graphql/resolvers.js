export default {
  Mutation: {
    updateLoggedInState: (_, { loggedIn }, { cache }) => {
      console.log(loggedIn);
      cache.writeData({
        data: {
          loggedIn: false,
        },
      });
      return null;
    },
  },
};

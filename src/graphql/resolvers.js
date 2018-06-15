export default {
  Mutation: {
    updateLoggedInState: (_, { loggedIn }, { cache }) => {
      cache.writeData({
        data: {
          loggedIn: false,
        },
      });
      return null;
    },
    updateNavbarVisibilityState: (_, { visible }, { cache }) => {
      cache.writeData({
        data: {
          navbarVisible: visible,
        },
      });
      return null;
    },
  },
};

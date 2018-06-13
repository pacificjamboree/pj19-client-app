const { REACT_APP_JWT_NAME } = process.env;

export default {
  viewer: null,
  loggedIn: !!localStorage.getItem(REACT_APP_JWT_NAME),
};

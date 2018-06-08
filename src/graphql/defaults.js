const { REACT_APP_JWT_NAME } = process.env;

export default {
  loggedIn: !!localStorage.getItem(REACT_APP_JWT_NAME),
};

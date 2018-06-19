import gql from 'graphql-tag';

const GET_VIEWER_USERNAME = gql`
  query {
    viewer {
      username
    }
  }
`;

const GET_NAVBAR_VISIBILITY_STATE = gql`
  query getNavbarVisibilityState {
    navbarVisible @client
  }
`;

const UPDATE_NAVBAR_VISIBILITY_STATE = gql`
  mutation updateNavbarVisibilityState($visible: Boolean!) {
    updateNavbarVisibilityState(visible: $visible) @client {
      navbarVisible
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation loginAsAdmin($username: String!, $password: String!) {
    createLoginToken(input: { username: $username, password: $password }) {
      token
      viewer {
        username
      }
    }
  }
`;

const GET_LOGIN_STATE = gql`
  query getLoginState {
    loggedIn @client
  }
`;

const UPDATE_LOGIN_STATE = gql`
  mutation updateLoggedInState($state: Boolean!) {
    updateLoggedInState(loggedIn: $state) @client {
      loggedIn
    }
  }
`;

export {
  GET_VIEWER_USERNAME,
  LOGIN_MUTATION,
  GET_LOGIN_STATE,
  UPDATE_LOGIN_STATE,
  GET_NAVBAR_VISIBILITY_STATE,
  UPDATE_NAVBAR_VISIBILITY_STATE,
};

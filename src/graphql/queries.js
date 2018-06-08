import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation loginAsAdmin($username: String!, $password: String!) {
    createLoginToken(input: { username: $username, password: $password }) {
      token
    }
  }
`;

const GET_LOGIN_STATE = gql`
  query {
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

export { LOGIN_MUTATION, GET_LOGIN_STATE, UPDATE_LOGIN_STATE };

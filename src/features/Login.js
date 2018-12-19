import React from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { Redirect } from '@reach/router';
import { GET_LOGIN_STATE, LOGIN_MUTATION } from '../graphql/queries';

import LoginForm from '../components/LoginForm';
const { REACT_APP_JWT_NAME } = process.env;

const Login = ({ client, location, ...rest }) => {
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirectTo') || '/dashboard';
  const data = client.readQuery({ query: GET_LOGIN_STATE });
  if (data.loggedIn) {
    return <Redirect to={redirectTo} noThrow />;
  }
  return (
    <Mutation
      mutation={LOGIN_MUTATION}
      update={async (cache, { data }) => {
        const {
          createLoginToken: { token },
        } = data;
        const loggedIn = !!token;
        cache.writeData({
          data: {
            loggedIn,
            viewer: {
              __typename: data.createLoginToken.viewer.__typename,
              username: data.createLoginToken.viewer.username,
              roles: data.createLoginToken.viewer.roles,
            },
          },
        });
        window.localStorage.setItem(REACT_APP_JWT_NAME, token);
      }}
    >
      {(loginMutation, { data, error }) => {
        return <LoginForm error={error} mutate={loginMutation} />;
      }}
    </Mutation>
  );
};

export default withApollo(Login);

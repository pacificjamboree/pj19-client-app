import React from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { navigate } from '@reach/router';
import { GET_LOGIN_STATE, LOGIN_MUTATION } from '../graphql/queries';

import LoginForm from '../components/LoginForm';
const { REACT_APP_JWT_NAME } = process.env;

const Login = ({ client }) => {
  const { loggedIn } = client.readQuery({ query: GET_LOGIN_STATE });
  if (loggedIn) {
    navigate('/');
    return null;
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
            },
          },
        });
        window.localStorage.setItem(REACT_APP_JWT_NAME, token);
        navigate('/');
      }}
    >
      {(loginMutation, { data, error }) => {
        return <LoginForm error={error} mutate={loginMutation} />;
      }}
    </Mutation>
  );
};

export default withApollo(Login);

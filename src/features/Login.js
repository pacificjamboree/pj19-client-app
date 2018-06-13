import React from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { navigate } from '@reach/router';
import { LOGIN_MUTATION } from '../graphql/queries';

import LoginForm from '../components/LoginForm';
const { REACT_APP_JWT_NAME } = process.env;

const Login = ({ client }) => {
  return (
    <Mutation
      mutation={LOGIN_MUTATION}
      update={async (cache, { data }) => {
        console.log(data);
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
      {loginMutation => (
        <div>
          <LoginForm mutate={loginMutation} />
        </div>
      )}
    </Mutation>
  );
};

export default withApollo(Login);

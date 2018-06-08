import React from 'react';
import { Mutation } from 'react-apollo';
import { navigate } from '@reach/router';

import { LOGIN_MUTATION } from '../graphql/queries';

import LoginForm from '../components/LoginForm';
const { REACT_APP_JWT_NAME } = process.env;

const Login = () => {
  return (
    <Mutation
      mutation={LOGIN_MUTATION}
      onError={e => {
        console.log('onError', e);
      }}
      update={(cache, { data }) => {
        const {
          createLoginToken: { token },
        } = data;
        const loggedIn = !!token;
        cache.writeData({
          data: {
            loggedIn,
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

export default Login;

import React from 'react';
import { Mutation } from 'react-apollo';
import { navigate } from '@reach/router';
import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation loginAsAdmin($username: String!, $password: String!) {
    createLoginToken(input: { username: $username, password: $password }) {
      token
    }
  }
`;

const Login = () => {
  let username, password;
  return (
    <Mutation
      mutation={LOGIN_MUTATION}
      onError={e => {
        console.log('onError');
      }}
      onCompleted={({ createLoginToken: { token } }) => {
        window.localStorage.setItem('token', token);
        navigate('/');
      }}
    >
      {(login, obj) => (
        <div>
          <h2>Login</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              login({
                variables: {
                  username: username.value,
                  password: password.value,
                },
              });
              username.value = '';
              password.value = '';
            }}
          >
            Username:{' '}
            <input
              ref={node => {
                username = node;
              }}
            />
            <br />
            Password:{' '}
            <input
              type="password"
              ref={node => {
                password = node;
              }}
            />
            <br />
            <button type="submit">Login</button>
            {obj.error && <p>{obj.error.message}</p>}
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default Login;

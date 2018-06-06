import React from 'react';
import { Mutation } from 'react-apollo';
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
      update={(
        cache,
        {
          data: {
            createLoginToken: { token },
          },
        }
      ) => {
        console.log(cache);
        console.log(token);
      }}
    >
      {(login, obj) => (
        <div>
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
            {obj.loading && <p>Loading...</p>}
            {obj.error && <p>Error :( {obj.error.message}</p>}
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default Login;

import React from 'react';
import { Link } from '@reach/router';
import { Query } from 'react-apollo';
import { GET_LOGIN_STATE } from '../../graphql/queries';
const LoginLogout = () => {
  return (
    <Query query={GET_LOGIN_STATE}>
      {({ data: { loggedIn } }) => {
        const href = loggedIn ? '/logout' : '/login';
        const text = loggedIn ? 'Logout' : 'Login';
        return <Link to={href}>{text}</Link>;
      }}
    </Query>
  );
};

export default LoginLogout;

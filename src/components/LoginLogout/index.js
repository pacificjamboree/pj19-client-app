import React from 'react';
import { Link } from '@reach/router';
import { Query } from 'react-apollo';
import { Menu } from 'semantic-ui-react';
import { GET_LOGIN_STATE } from '../../graphql/queries';
// import UserMenu from '../UserMenu';

const LoginLogout = () => {
  return (
    <Query query={GET_LOGIN_STATE}>
      {({ data: { loggedIn } }) => {
        return loggedIn ? (
          <Menu.Item>
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        ) : (
          // <UserMenu />
          <Menu.Item>
            <Link to="/login">Login</Link>
          </Menu.Item>
        );
      }}
    </Query>
  );
};

export default LoginLogout;

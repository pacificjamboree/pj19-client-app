import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from '@reach/router';
import { GET_LOGIN_STATE } from '../../graphql/queries';

const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Query query={GET_LOGIN_STATE}>
    {({ loading, error, data: { loggedIn } }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      return loggedIn ? (
        <Component {...rest} />
      ) : (
        <Redirect noThrow to="/login" />
      );
    }}
  </Query>
);

export default LoggedInRoute;

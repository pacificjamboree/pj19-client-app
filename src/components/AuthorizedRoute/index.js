import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from '@reach/router';
import { GET_LOGGED_IN_VIEWER } from '../../graphql/queries';

const AuthorizedRoute = ({ userRoles, component: Component, path, ...rest }) =>
  console.log(rest) || (
    <Query query={GET_LOGGED_IN_VIEWER}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;

        if (!data.loggedIn)
          return <Redirect noThrow to={`/login?redirectTo=${path}`} />;
        if (!data.viewer) return null;

        const { roles } = data.viewer;

        return roles.includes('admin') ||
          roles.some(r => userRoles.includes(r)) ? (
          <Component {...rest} />
        ) : (
          <p>Unauthorized.</p>
        );
      }}
    </Query>
  );

export default AuthorizedRoute;

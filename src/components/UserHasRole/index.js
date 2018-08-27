import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import LoggedIn from '../LoggedIn';
import { GET_VIEWER_USERNAME } from '../../graphql/queries';

const UserHasRole = ({ userRoles, children }) => (
  <LoggedIn>
    <Query query={GET_VIEWER_USERNAME}>
      {({ loading, error, data: { viewer } }) => {
        if (loading || !viewer) return null;
        if (error) return `Error!: ${error}`;
        const { roles } = viewer;

        // an admin will always work
        return roles.includes('admin') || roles.some(r => userRoles.includes(r))
          ? children
          : null;
      }}
    </Query>
  </LoggedIn>
);

UserHasRole.propTypes = {
  userRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
    PropTypes.node,
  ]),
};

export default UserHasRole;

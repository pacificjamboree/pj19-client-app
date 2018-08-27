import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { GET_LOGIN_STATE } from '../../graphql/queries';

const LoggedIn = ({ children }) => (
  <Query query={GET_LOGIN_STATE}>
    {({ loading, error, data: { loggedIn } }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      return loggedIn ? children : null;
    }}
  </Query>
);

LoggedIn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};

export default LoggedIn;

import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { navigate } from '@reach/router';
import { UPDATE_LOGIN_STATE } from '../graphql/queries';
/*
  on logout, we need to:
  - clear the token from local storage
  - set the loggedIn flag in local state
  - redirect to /
 */

class Logout extends Component {
  componentDidMount() {
    this.logout();
  }

  render() {
    return (
      <Mutation
        mutation={UPDATE_LOGIN_STATE}
        variables={{ state: false }}
        onError={e => {
          console.log(e);
        }}
        onCompleted={() => {
          localStorage.removeItem(process.env.REACT_APP_JWT_NAME);
          navigate('/');
        }}
      >
        {logout => {
          this.logout = logout;
          return null;
        }}
      </Mutation>
    );
  }
}

export default Logout;

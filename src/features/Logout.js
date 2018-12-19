import React, { Component } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { UPDATE_LOGIN_STATE } from '../graphql/queries';

class Logout extends Component {
  componentDidMount() {
    this.logout();
    localStorage.removeItem(process.env.REACT_APP_JWT_NAME);
    this.props.client.resetStore();
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
          // instead of navigating to /, we set window.locaiton
          // in order to force a page refresh and hopefully
          // actually, really, clear the APollo cache
          window.location = '/';
          // navigate('/');
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

export default withApollo(Logout);

import React, { Component } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { navigate } from '@reach/router';
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

export default withApollo(Logout);

import { Mutation, withApollo } from 'react-apollo';
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { pushFlashMessage } from '../../lib/flashMessage';
import { CREATE_USER } from '../../graphql/queries';

const CreateUserButton = ({ client, oosId, username, disabled }) => (
  <Mutation
    errorPolicy="all"
    mutation={CREATE_USER}
    update={() => {
      pushFlashMessage(client, {
        kind: 'success',
        message: 'Login created',
      });
    }}
    onError={error => {
      pushFlashMessage(client, {
        kind: 'error',
        message: 'An error occurred while creating a login for this OOS',
        error: error.message,
      });
    }}
  >
    {(createLogin, { data, error }) => {
      return (
        <Button
          icon
          disabled={disabled}
          labelPosition="left"
          title="Create login for OOS"
          onClick={() => {
            createLogin({ variables: { username, oosId } });
          }}
        >
          <Icon name="user plus" />
          Create Login for OOS
        </Button>
      );
    }}
  </Mutation>
);

export default withApollo(CreateUserButton);

import { Mutation, withApollo } from 'react-apollo';
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { pushFlashMessage } from '../../lib/flashMessage';
import {
  GET_OFFER_OF_SERVICE_BY_OOS_NUMBER,
  CREATE_USER,
} from '../../graphql/queries';

const CreateUserButton = ({ client, oosId, username, disabled, oosNumber }) => (
  <Mutation
    errorPolicy="all"
    mutation={CREATE_USER}
    refetchQueries={[
      {
        query: GET_OFFER_OF_SERVICE_BY_OOS_NUMBER,
        variables: { oosNumber },
      },
    ]}
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
            createLogin({
              variables: { username, oosId, workflowState: 'defined' },
            });
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

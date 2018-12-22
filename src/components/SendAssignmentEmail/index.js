import { Mutation, withApollo } from 'react-apollo';
import { Button, Icon } from 'semantic-ui-react';
import React from 'react';
import { pushFlashMessage } from '../../lib/flashMessage';
import { SEND_OOS_ASSIGNMENT_EMAIL } from '../../graphql/queries';

const SendAssignmentEmail = ({ client, id, assigned }) => (
  <Mutation
    mutation={SEND_OOS_ASSIGNMENT_EMAIL}
    update={() => {
      pushFlashMessage(client, {
        kind: 'success',
        message: 'Assignment email sent',
      });
    }}
    onError={error => {
      console.error(error);
      pushFlashMessage(client, {
        kind: 'error',
        message: 'An error occurred while sending the assignment email',
        error: error.message,
      });
    }}
  >
    {(sendEmail, { data, error, loading }) => (
      <Button
        icon
        loading={loading}
        labelPosition="left"
        disabled={loading || !assigned}
        title={
          assigned
            ? 'Send assignment email to OOS'
            : 'OOS is not assigned to an Adventure'
        }
        onClick={() => {
          sendEmail({ variables: { id } });
        }}
      >
        <Icon name="mail" />
        Send Assignment Email
      </Button>
    )}
  </Mutation>
);

export default withApollo(SendAssignmentEmail);

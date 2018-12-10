import { Mutation, withApollo } from 'react-apollo';
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { pushFlashMessage } from '../../lib/flashMessage';
import { SEND_OOS_ASSIGNMENT_EMAIL } from '../../graphql/queries';

const SendAssignmentEmailButton = ({ client, id, assigned }) => (
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
      });
    }}
  >
    {(sendEmail, { data, error }) => {
      return (
        <Button
          icon
          labelPosition="left"
          disabled={!assigned}
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
      );
    }}
  </Mutation>
);

export default withApollo(SendAssignmentEmailButton);

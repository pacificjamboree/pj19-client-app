import { Mutation, withApollo } from 'react-apollo';
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { pushFlashMessage } from '../../lib/flashMessage';
import { SEND_OOS_WELCOME_EMAIL } from '../../graphql/queries';

const SendWelcomeEmailButton = ({ client, id }) => (
  <Mutation
    mutation={SEND_OOS_WELCOME_EMAIL}
    update={() => {
      pushFlashMessage(client, {
        kind: 'success',
        message: 'Welcome email sent',
      });
    }}
    onError={error => {
      console.error(error);
      pushFlashMessage(client, {
        kind: 'error',
        message: 'An error occurred while sending the welcome email',
      });
    }}
  >
    {(sendEmail, { data, error }) => {
      return (
        <Button
          icon
          labelPosition="left"
          title="Send welcome email to OOS"
          onClick={() => {
            sendEmail({ variables: { id } });
          }}
        >
          <Icon name="mail" />
          Send Welcome Email
        </Button>
      );
    }}
  </Mutation>
);

export default withApollo(SendWelcomeEmailButton);

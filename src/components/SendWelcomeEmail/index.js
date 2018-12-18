import { Mutation, withApollo } from 'react-apollo';
import React from 'react';
import { pushFlashMessage } from '../../lib/flashMessage';
import { SEND_OOS_WELCOME_EMAIL } from '../../graphql/queries';

const SendWelcomeEmail = ({ client, id, children }) => (
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
      return React.cloneElement(children, {
        onClick: () => {
          sendEmail({ variables: { id } });
        },
      });
    }}
  </Mutation>
);

export default withApollo(SendWelcomeEmail);

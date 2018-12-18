import { Mutation, withApollo } from 'react-apollo';
import React from 'react';
import { pushFlashMessage } from '../../lib/flashMessage';
import { SEND_OOS_ASSIGNMENT_EMAIL } from '../../graphql/queries';

const SendAssignmentEmail = ({ client, id, children }) => (
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
      return React.cloneElement(children, {
        onClick: () => {
          sendEmail({ variables: { id } });
        },
      });
    }}
  </Mutation>
);

export default withApollo(SendAssignmentEmail);

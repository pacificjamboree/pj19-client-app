import { Mutation, withApollo } from 'react-apollo';
import React from 'react';
import formatDate from 'date-fns/format';
import { pushFlashMessage } from '../../lib/flashMessage';
import { SEND_OOS_WELCOME_EMAIL } from '../../graphql/queries';

const SendWelcomeEmail = ({ client, id, children, lastSentAt, refetch }) => (
  <Mutation
    mutation={SEND_OOS_WELCOME_EMAIL}
    refetchQueries={[refetch]}
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
        error: error.message,
      });
    }}
  >
    {(sendEmail, { data, error, loading }) => {
      const button = React.cloneElement(children, {
        onClick: () => {
          sendEmail({ variables: { id } });
        },
      });
      return (
        <>
          {button}
          <div
            style={{
              marginBottom: '0.75em',
              fontSize: 'smaller',
              textAlign: 'left',
            }}
          >
            {lastSentAt && (
              <span>
                Last sent: {formatDate(lastSentAt, 'YYYY-MM-DD HH:mm')}
              </span>
            )}
          </div>
        </>
      );
    }}
  </Mutation>
);

export default withApollo(SendWelcomeEmail);

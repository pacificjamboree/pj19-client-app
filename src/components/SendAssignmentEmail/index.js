import { Mutation, withApollo } from 'react-apollo';
import React from 'react';
import formatDate from 'date-fns/format';
import { pushFlashMessage } from '../../lib/flashMessage';
import { SEND_OOS_ASSIGNMENT_EMAIL } from '../../graphql/queries';

const SendAssignmentEmail = ({
  client,
  id,
  assigned,
  children,
  lastSentAt,
  refetch,
}) => (
  <Mutation
    mutation={SEND_OOS_ASSIGNMENT_EMAIL}
    refetchQueries={[refetch]}
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
    {(sendEmail, { data, error, loading }) => {
      const button = React.cloneElement(children, {
        onClick: () => {
          sendEmail({ variables: { id } });
        },
        disabled: loading || !assigned,
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

export default withApollo(SendAssignmentEmail);

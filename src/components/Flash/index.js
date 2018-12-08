import React from 'react';
import { Query, withApollo } from 'react-apollo';
import { Message } from 'semantic-ui-react';
import { popFlashMessage } from '../../lib/flashMessage';
import { GET_FLASH_MESSAGES } from '../../graphql/queries';

const Flash = ({ client }) => {
  return (
    <div style={{ marginBottom: '3em' }}>
      <Query query={GET_FLASH_MESSAGES}>
        {({ data: { messages } }) => {
          console.log({ messages });
          return messages
            ? messages.map(({ message, kind, id }, i) => {
                switch (kind) {
                  case 'success':
                    return (
                      <Message
                        success
                        key={id}
                        onDismiss={() => {
                          popFlashMessage(client.cache, id);
                        }}
                      >
                        {message}
                      </Message>
                    );

                  case 'error':
                    return (
                      <Message error key={id}>
                        {message}
                      </Message>
                    );

                  default:
                    return <Message key={id}>{message}</Message>;
                }
              })
            : null;
        }}
      </Query>
    </div>
  );
};

export default withApollo(Flash);

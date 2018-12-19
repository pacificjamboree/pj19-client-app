import React from 'react';
import { Query, withApollo } from 'react-apollo';
import { Message } from 'semantic-ui-react';
import { popFlashMessage } from '../../lib/flashMessage';
import { GET_FLASH_MESSAGES } from '../../graphql/queries';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './style.css';

const FlashMessages = ({ client }) => {
  return (
    <Query query={GET_FLASH_MESSAGES}>
      {({ data: { messages } }) => {
        const items = messages.map(({ message, kind, id, error }, i) => {
          switch (kind) {
            case 'success':
              return (
                <Message
                  success
                  key={id}
                  onDismiss={() => {
                    popFlashMessage(client, id);
                  }}
                >
                  {message}
                </Message>
              );

            case 'error':
              return (
                <Message
                  error
                  key={id}
                  onDismiss={() => {
                    popFlashMessage(client, id);
                  }}
                >
                  <p>{message}</p>
                  {process.env.NODE_ENV === 'development' ? (
                    <pre
                      style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}
                    >
                      {error}
                    </pre>
                  ) : null}
                </Message>
              );

            default:
              return (
                <Message
                  key={id}
                  onDismiss={() => {
                    popFlashMessage(client, id);
                  }}
                >
                  {message}
                </Message>
              );
          }
        });
        return (
          <ReactCSSTransitionGroup
            transitionName="flashMessage"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <div style={{ paddingBottom: '1em' }}>{items}</div>
          </ReactCSSTransitionGroup>
        );
      }}
    </Query>
  );
};

export default withApollo(FlashMessages);

import React from 'react';
import { Query, withApollo } from 'react-apollo';
import { Message } from 'semantic-ui-react';
import { popFlashMessage } from '../../lib/flashMessage';
import { GET_FLASH_MESSAGES } from '../../graphql/queries';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './style.css';

const Flash = ({ client }) => {
  return (
    <div style={{ marginBottom: '3em' }}>
      <Query query={GET_FLASH_MESSAGES}>
        {({ data: { messages } }) => {
          const items = messages.map(({ message, kind, id }, i) => {
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
                    {message}
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
              {items}
            </ReactCSSTransitionGroup>
          );
        }}
      </Query>
    </div>
  );
};

export default withApollo(Flash);

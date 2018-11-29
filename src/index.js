import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import ReactDOM from 'react-dom';
import App from './features/App';
import registerServiceWorker from './registerServiceWorker';
import { defaults, resolvers } from './graphql';
import 'semantic-ui-css/semantic.min.css';

const { REACT_APP_GRAPHQL_ENDPOINT, REACT_APP_JWT_NAME } = process.env;

const client = new ApolloClient({
  uri: REACT_APP_GRAPHQL_ENDPOINT,
  request: operation => {
    operation.setContext(({ headers }) => {
      const token = localStorage.getItem(REACT_APP_JWT_NAME);
      if (token) {
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${token}`,
          },
        };
      }
    });
  },
  clientState: {
    resolvers,
    defaults,
  },
});

client.onResetStore(() => {
  client.cache.writeData({ data: defaults });
});

class Root extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

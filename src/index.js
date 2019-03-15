import './polyfills';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import ReactDOM from 'react-dom';
import { navigate } from '@reach/router';
import App from './features/App';
import { unregister } from './registerServiceWorker';
import { defaults, resolvers } from './graphql';
import 'semantic-ui-css/semantic.min.css';

const { REACT_APP_GRAPHQL_ENDPOINT, REACT_APP_JWT_NAME } = process.env;

const client = new ApolloClient({
  uri: REACT_APP_GRAPHQL_ENDPOINT,
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError && networkError.statusCode === 401) {
      console.log({ networkError });
      localStorage.removeItem(process.env.REACT_APP_JWT_NAME);
      client.resetStore();
      navigate('/login');
    }
  },
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
// remove service worker
unregister();

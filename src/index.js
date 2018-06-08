import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import ReactDOM from 'react-dom';
import './index.css';
import App from './features/App';
import registerServiceWorker from './registerServiceWorker';
import { defaults, resolvers } from './graphql';

const { REACT_APP_GRAPHQL_ENDPOINT } = process.env;

const httpLink = new HttpLink({ uri: REACT_APP_GRAPHQL_ENDPOINT });

const authLink = setContext((_, { headers }) => {
  const { REACT_APP_JWT_NAME } = process.env;
  const token = localStorage.getItem(REACT_APP_JWT_NAME);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  resolvers,
  defaults,
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, stateLink, httpLink]),
  cache,
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

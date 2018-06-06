import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import ReactDOM from 'react-dom';
import './index.css';
import App from './features/App';
import registerServiceWorker from './registerServiceWorker';

const { REACT_APP_GRAPHQL_ENDPOINT } = process.env;
console.log(REACT_APP_GRAPHQL_ENDPOINT);
const client = new ApolloClient({
  uri: REACT_APP_GRAPHQL_ENDPOINT,
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

import React from 'react';
import { Query } from 'react-apollo';
import { Router } from '@reach/router';
import Login from './Login';
import Logout from './Logout';
import Adventures from './Adventures';
import NavBar from '../components/NavBar';
import { GET_VIEWER_USERNAME } from '../graphql/queries';

const App = () => (
  <Query fetchPolicy="network-only" query={GET_VIEWER_USERNAME}>
    {() => (
      <div>
        <NavBar />
        <Router>
          <Home path="/" />
          <Login path="/login" />
          <Logout path="/logout" />
          <Adventures path="/adventures" />
        </Router>
      </div>
    )}
  </Query>
);

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to PJ 2019 Adventure</p>
  </div>
);

export default App;

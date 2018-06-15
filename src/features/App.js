import React from 'react';
import { Query } from 'react-apollo';
import { Router } from '@reach/router';
import { Container } from 'semantic-ui-react';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Adventures from './Adventures';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { GET_VIEWER_USERNAME } from '../graphql/queries';

const App = () => (
  <Query fetchPolicy="network-only" query={GET_VIEWER_USERNAME}>
    {() => (
      <div>
        <NavBar />
        <Container style={{ paddingTop: '6em' }}>
          <Router>
            <Home path="/" />
            <Login path="/login" />
            <Logout path="/logout" />
            <Adventures path="/adventures" />
          </Router>
        </Container>
        <Footer />
      </div>
    )}
  </Query>
);

export default App;

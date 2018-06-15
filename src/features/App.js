import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Router } from '@reach/router';
import { Container } from 'semantic-ui-react';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Adventures from './Adventures';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import SideNav from '../components/SideNav';

import { GET_VIEWER_USERNAME } from '../graphql/queries';

class App extends Component {
  render() {
    return (
      <Query fetchPolicy="network-only" query={GET_VIEWER_USERNAME}>
        {() => (
          <div
            style={{
              display: 'flex',
              minHeight: '100vh',
              flexDirection: 'column',
            }}
          >
            <SideNav>
              <NavBar />

              <Container
                style={{ flex: 1, paddingTop: '6em', paddingBottom: '2em' }}
              >
                <Router>
                  <Home path="/" />
                  <Login path="/login" />
                  <Logout path="/logout" />
                  <Adventures path="/adventures" />
                </Router>
              </Container>
            </SideNav>
            <Footer />
          </div>
        )}
      </Query>
    );
  }
}

export default App;

/*
logged out
- / --> Home
- /login --> Login
- /adventures
- /adventure/:id
- /adventure_guide
- /faq


*/

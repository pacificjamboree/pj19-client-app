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
              minHeight: '100%',
              display: 'grid',
              gridTemplateRows: 'auto 1fr auto',
              gridTemplateColumns: '100%',
            }}
          >
            <SideNav>
              <NavBar />

              <Container style={{ paddingTop: '6em', paddingBottom: '2em' }}>
                <Router>
                  <Home path="/" />
                  <Login path="/login" />
                  <Logout path="/logout" />
                  <Adventures path="/adventures" />
                </Router>
              </Container>
              <Footer />
            </SideNav>
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

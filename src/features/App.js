import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Router } from '@reach/router';
import { Container } from 'semantic-ui-react';
import FlashMessages from '../components/FlashMessages';
import Home from './Home';
import AdventureGuide from './AdventureGuide';
import Dashboard from './Dashboard';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Logout from './Logout';
import Adventures from './Adventures';
import AdventureDetail from './AdventureDetail';
import AdventureEdit from './AdventureEdit';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import NotFound from './NotFound';
import FAQ from './FAQ';
import Contact from './Contact';
import AuthorizedRoute from '../components/AuthorizedRoute';
import ErrorBoundary from '../components/ErrorBoundary';

import { GET_VIEWER_USERNAME } from '../graphql/queries';
import LoggedInRoute from '../components/LoggedInRoute/index';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
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
              {/* <SideNav> */}
              <NavBar />

              <Container
                id="main"
                style={{
                  paddingTop: '6em',
                  paddingBottom: '2em',
                  minHeight: '80vh',
                }}
              >
                <FlashMessages />
                <Router>
                  <Home path="/" />
                  <Home path="/home" />
                  <AdventureGuide path="/guide" />
                  <LoggedInRoute path="dashboard/*" component={Dashboard} />
                  <Login path="/login" />
                  <Logout path="/logout" />
                  <ForgotPassword path="/forgotPassword" />
                  <ResetPassword path="/resetPassword/:passwordResetToken" />
                  <Adventures path="/adventures" />
                  <AdventureDetail path="/adventures/:id" />
                  <AuthorizedRoute
                    userRoles={['adventureManager', 'admin']}
                    path="/adventures/:id/edit"
                    component={AdventureEdit}
                  />
                  <FAQ path="/faq" />
                  <Contact path="/contact" />
                  <NotFound default />
                </Router>
              </Container>
              <Footer />
            </div>
          )}
        </Query>
      </ErrorBoundary>
    );
  }
}

export default App;

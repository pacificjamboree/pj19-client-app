import React from 'react';
import { Router, Link } from '@reach/router';
import { Container, Grid, Header } from 'semantic-ui-react';
import Nav from './Nav';
import NotFound from '../NotFound';
import AdventureDetail from '../AdventureDetail';
import AdventureEdit from '../AdventureEdit';
import OOSDetail from '../OOSDetail';
import Stats from './Stats';

const AdventureManagerDashboard = ({ user }) => {
  const adventureId = user.OfferOfService.assignment.id;
  return (
    <Container>
      <Grid>
        <Grid.Column width={3}>
          <Nav />
        </Grid.Column>
        <Grid.Column width={13}>
          <Router>
            <Home user={user} path="/" />
            <AdventureDetail id={adventureId} path="adventures/mine" />
            <AdventureEdit
              id={adventureId}
              path="adventures/mine/edit"
              navigateToAfterMutataion=".."
            />
            <OOSDetail path="oos/:oosNumber" />
            <NotFound default />
          </Router>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

const Home = ({ user }) => {
  const { username, OfferOfService } = user;
  const name = OfferOfService
    ? OfferOfService.preferredName || OfferOfService.firstName
    : username;

  return (
    <>
      <Header as="h1">Hello, {name}</Header>
      <Header as="h2">
        You are an Adventure Manager for{' '}
        <Link to="adventures/mine">{OfferOfService.assignment.fullName}</Link>
      </Header>
      <Stats adventureId={OfferOfService.assignment.id} />
    </>
  );
};

export default AdventureManagerDashboard;

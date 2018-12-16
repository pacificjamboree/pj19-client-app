import React from 'react';
import { Router } from '@reach/router';
import { Container, Grid, Header } from 'semantic-ui-react';
import Nav from './Nav';
import Stats from './Stats';
import NotFound from '../NotFound';
import OOSList from '../OOSList';
import OOSDetail from '../OOSDetail';
import OOSEdit from '../OOSEdit';
import OOSImport from '../OOSImport';
import Adventures from '../Adventures';
import AdventureDetail from '../AdventureDetail';

const AdminDashboard = ({ user }) => {
  return (
    <Container>
      <Grid>
        <Grid.Column width={3}>
          <Nav />
        </Grid.Column>
        <Grid.Column width={13}>
          <Router>
            <Home user={user} path="/" />

            <OOSList path="oos" />
            <OOSImport path="oos/import" />
            <OOSDetail path="oos/:oosNumber" />
            <OOSEdit path="oos/:oosNumber/edit" />

            <Adventures path="adventures" />
            <AdventureDetail path="adventures/:id" />
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
      <Stats />
    </>
  );
};
export default AdminDashboard;

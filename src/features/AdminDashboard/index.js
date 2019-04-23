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
import OOSOverdueAssignmentReport from '../OOSOverdueAssignmentReport';
import AdventureList from '../AdventureList';
import AdventureCreate from '../AdventureCreate';
import AdventureDetail from '../AdventureDetailAdmin';
import AdventureEdit from '../AdventureEdit';
import AdventureGuideEdit from '../AdventureGuideEdit';
import PatrolList from '../PatrolList';
import PatrolDetail from '../PatrolDetail';
import PatrolImport from '../PatrolImport';
import AdventureSelectionView from '../AdventureSelectionView';
import AdventureSelectionEdit from '../AdventureSelectionEdit';

const AdminDashboard = ({ user }) => {
  console.log(React.version);
  return (
    <Container>
      <Grid stackable>
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
            <OOSOverdueAssignmentReport path="oos/reports/overdue_assignments" />

            <AdventureList path="adventures" />
            <AdventureCreate path="adventures/create" />
            <AdventureDetail path="adventures/:id" />
            <AdventureEdit
              path="adventures/:id/edit"
              navigateToAfterMutataion=".."
            />
            <AdventureGuideEdit path="guide/edit" />

            <PatrolList path="patrols" />
            <PatrolDetail path="patrols/:patrolNumber" />
            <PatrolImport path="patrols/import" />
            <AdventureSelectionView
              user={user}
              path="/adventureSelection/:id"
            />
            <AdventureSelectionEdit
              user={user}
              path="/adventureSelection/:id/edit"
            />

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

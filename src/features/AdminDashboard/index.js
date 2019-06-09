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
import PatrolPaymentImport from '../PatrolPaymentImport';
import AdventureSelectionView from '../AdventureSelectionView';
import AdventureSelectionEdit from '../AdventureSelectionEdit';
import PatrolAdventureSelectionStats from '../PatrolAdventureSelectionStats';
import AdventureStatus from '../AdventureStatus';
import PatrolScheduleStatus from '../PatrolScheduleStatus';

import styles from './styles.module.css';

const AdminDashboard = ({ user }) => {
  return (
    <Container>
      <Grid stackable>
        <Grid.Column width={3} className={styles.noprint}>
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
            <PatrolPaymentImport path="patrols/import/payment" />

            <PatrolAdventureSelectionStats
              user={user}
              path="/adventureSelection/stats"
            />

            <AdventureSelectionView
              user={user}
              path="/adventureSelection/:id"
            />
            <AdventureSelectionEdit
              user={user}
              path="/adventureSelection/:id/edit"
            />

            <AdventureStatus path="/adventure_status" />
            <PatrolScheduleStatus path="/patrol_schedule_status" />

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

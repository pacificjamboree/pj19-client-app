import React from 'react';
import { Router } from '@reach/router';
import { Container, Grid } from 'semantic-ui-react';
import Nav from './Nav';
import NotFound from '../NotFound';
import Home from './Home';
import AdventureSelectionEdit from '../AdventureSelectionEdit';
import AdventureSelectionView from '../AdventureSelectionView';
import PatrolScheduleView from '../PatrolScheduleView';

const PatrolScouterDashbaord = ({ user }) => {
  console.log({ user });
  return (
    <Container>
      <Grid stackable>
        <Grid.Column width={3}>
          <Nav />
        </Grid.Column>
        <Grid.Column width={13}>
          <Router>
            <Home user={user} path="/" />
            <AdventureSelectionView
              user={user}
              path="/adventureSelection/:id"
            />
            <AdventureSelectionEdit
              user={user}
              path="/adventureSelection/:id/edit"
            />
            <PatrolScheduleView user={user} path="/patrolSchedule/:id/" />
            <NotFound default />
          </Router>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default PatrolScouterDashbaord;

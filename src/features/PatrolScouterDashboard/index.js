import React from 'react';
import { Router } from '@reach/router';
import { Container, Grid } from 'semantic-ui-react';
import Nav from './Nav';
import NotFound from '../NotFound';
import Home from './Home';

const PatrolScouterDashbaord = ({ user }) => {
  return (
    <Container>
      <Grid>
        <Grid.Column width={3}>
          <Nav />
        </Grid.Column>
        <Grid.Column width={13}>
          <Router>
            <Home user={user} path="/" />

            <NotFound default />
          </Router>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default PatrolScouterDashbaord;

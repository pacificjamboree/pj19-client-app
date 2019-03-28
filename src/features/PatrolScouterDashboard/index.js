import React from 'react';
import { Router } from '@reach/router';
import { Container, Grid, Header, Icon, Message, Tab } from 'semantic-ui-react';
import pluralize from 'pluralize';
import Nav from './Nav';
import NotFound from '../NotFound';
import PatrolDetailTable from '../../components/PatrolDetailTable';

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

const Home = ({ user }) => {
  console.log({ user });
  const { Patrols: patrols } = user.PatrolScouter;
  const numPatrols = patrols.length;

  const panes = patrols
    .sort((a, b) => {
      if (a.patrolNumber < b.patrolNumber) return -1;
      if (a.patrolNumber > b.patrolNumber) return 1;
      return 0;
    })
    .map(p => {
      const patrol = {
        ...p,
        patrolScouter: user.PatrolScouter,
      };

      return {
        menuItem: `Patrol ${patrol.patrolNumber}`,
        render: () => (
          <Tab.Pane>
            <Header as="h2">Patrol {patrol.patrolNumber}</Header>
            <PatrolDetailTable patrol={patrol} />
          </Tab.Pane>
        ),
      };
    });

  return (
    <>
      <Header as="h1">Your Patrols</Header>
      <p>
        You are the contact Patrol Scoouter for {numPatrols}{' '}
        {pluralize('patrol', numPatrols)}.
      </p>

      <Message icon warning>
        <Icon name="warning circle" />
        <Message.Content>
          The patrol information below is provided by the PJ Registrar. If this
          information is incorrect, please email{' '}
          <strong>participantregistrar.pj@scouts.ca</strong> and{' '}
          <strong>adventure@pacificjamboree.ca</strong> with corrections.
        </Message.Content>
      </Message>

      <Container style={{ marginTop: '2em' }}>
        <Tab panes={panes} />
      </Container>
    </>
  );
};

export default PatrolScouterDashbaord;

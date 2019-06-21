import React from 'react';
import { Container, Header, Tab } from 'semantic-ui-react';
import pluralize from 'pluralize';
import queryString from 'query-string';
import PatrolDetailTable from '../../components/PatrolDetailTable';

const Home = ({ user, location }) => {
  const qs = queryString.parse(location.search);
  const activePatrol = qs.patrol;

  const { Patrols: patrols } = user.PatrolScouter;
  const numPatrols = patrols.length;

  const sortedPatrols = patrols.sort((a, b) => {
    if (a.patrolNumber < b.patrolNumber) return -1;
    if (a.patrolNumber > b.patrolNumber) return 1;
    return 0;
  });

  const panes = sortedPatrols.map(p => {
    const patrol = {
      ...p,
      patrolScouter: user.PatrolScouter,
    };

    return {
      menuItem: `Patrol ${patrol.patrolNumber}`,
      render: () => {
        return (
          <Tab.Pane>
            <Header as="h2">Patrol {patrol.patrolNumber}</Header>
            <PatrolDetailTable patrol={patrol} />
          </Tab.Pane>
        );
      },
    };
  });

  const activeIndex = activePatrol
    ? sortedPatrols.findIndex(p => p.patrolNumber === activePatrol)
    : 0;

  return (
    <>
      <Header as="h1">Your Patrols</Header>
      <p>
        You are the contact Patrol Scoouter for {numPatrols}{' '}
        {pluralize('patrol', numPatrols)}.
      </p>
      <Container style={{ marginTop: '2em' }}>
        <Tab
          panes={panes}
          defaultActiveIndex={activeIndex >= 0 ? activeIndex : 0}
        />
      </Container>
    </>
  );
};

export default Home;

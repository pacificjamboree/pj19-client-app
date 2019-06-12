import React from 'react';
import { Router, Link } from '@reach/router';
import { Container, Grid, Header } from 'semantic-ui-react';
import Nav from './Nav';
import NotFound from '../NotFound';
import AdventureDetailAdmin from '../AdventureDetailAdmin';
import AdventureEdit from '../AdventureEdit';
import OOSDetail from '../OOSDetail';

const AdventureManagerDashboard = ({ user }) => {
  const adventureId = user.OfferOfService.assignment.id;
  const adventureSlug = user.OfferOfService.assignment.adventureCode;
  return (
    <Container>
      <Grid stackable>
        <Grid.Column width={3}>
          <Nav adventureSlug={adventureSlug} />
        </Grid.Column>
        <Grid.Column width={13}>
          <Router>
            <Home user={user} path="/" />
            {user.OfferOfService.managesAdventures.map(a => (
              <AdventureDetailAdmin
                key={a.id}
                id={a.id}
                path={`adventures/${a.adventureCode}`}
              />
            ))}
            <AdventureDetailAdmin
              id={adventureId}
              path={`adventures/${adventureSlug}`}
            />
            <AdventureEdit
              id={adventureId}
              path="adventures/:id/edit"
              navigateToAfterMutataion={`/dashboard/adventures/${adventureSlug}`}
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
      <p>You are an Adventure Manager for:</p>
      <ul>
        {OfferOfService.managesAdventures.map(a => (
          <li key={a.id}>
            <Link to={`adventures/${a.adventureCode}`}>{a.fullName}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdventureManagerDashboard;

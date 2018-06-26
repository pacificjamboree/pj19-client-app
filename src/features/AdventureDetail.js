import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Container, Loader, Header, Label } from 'semantic-ui-react';

import PremiumAdventureLabel from '../components/PremiumAdventureLabel';
import FeeLabel from '../components/FeeLabel';
import DurationLabel from '../components/DurationLabel';

import { GET_ADVENTURE_BY_ID } from '../graphql/queries';

const AdventureDetail = ({ id }) => (
  <Container>
    <Query query={GET_ADVENTURE_BY_ID} variables={{ id }}>
      {({ data: { adventure }, loading, error }) => {
        if (loading) return <Loader active />;
        if (error) return <p>Error</p>;

        return (
          <Fragment>
            <Header as="h1">{adventure.themeName}</Header>
            <p>{adventure.name}</p>

            {adventure.fee ? <FeeLabel fee={adventure.fee} /> : null}
            {adventure.premiumAdventure ? <PremiumAdventureLabel /> : null}
            <DurationLabel duration={adventure.periodsRequired} />
            <Label>{adventure.capacityPerPeriod} Participants per Period</Label>

            <p>{adventure.description}</p>
          </Fragment>
        );
      }}
    </Query>
  </Container>
);

export default AdventureDetail;

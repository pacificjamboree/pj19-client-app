import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Container, Loader, Header } from 'semantic-ui-react';

import AdventureLabels from '../components/AdventureLabels';

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
            <AdventureLabels adventure={adventure} />

            <p>{adventure.description}</p>
          </Fragment>
        );
      }}
    </Query>
  </Container>
);

export default AdventureDetail;

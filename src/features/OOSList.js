import React, { Fragment } from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  OFFERS_OF_SERVICE_FRAGMENT,
  ADVENTURE_NAME_ID_FRAGMENT,
} from '../graphql/fragments';
import OOSTable from '../components/OOSTable';

const QUERY = gql`
  query getOOSWithAdventureNamesIds {
    offersOfService: offersOfService {
      ...OffersOfServiceFragment
      welcomeEmailSentAt
      assignmentEmailSentAt
    }
    adventures: adventures {
      ...AdventureNameIdFragment
    }
  }
  ${OFFERS_OF_SERVICE_FRAGMENT}
  ${ADVENTURE_NAME_ID_FRAGMENT}
`;

const OOSList = () => (
  <Container>
    <Query query={QUERY}>
      {({ data, loading, error }) => {
        if (error) return <p>Error</p>;
        if (loading) return <Loader />;
        const { offersOfService, adventures } = data;
        return (
          <Fragment>
            <Header as="h1">Offers of Service</Header>
            <OOSTable
              defaultSortColumn="oosNumber"
              offersOfService={offersOfService}
              adventures={adventures}
            />
          </Fragment>
        );
      }}
    </Query>
  </Container>
);

export default OOSList;

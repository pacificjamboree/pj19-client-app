import React, { Fragment } from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { GET_OFFERS_OF_SERVICE } from '../graphql/queries';
import OOSTable from '../components/OOSTable';

const OOSList = () => (
  <Container>
    <Query query={GET_OFFERS_OF_SERVICE}>
      {({ data, loading, error }) => {
        if (error) return <p>Error</p>;
        if (loading) return <Loader />;
        const { offersOfService } = data;
        return (
          <Fragment>
            <Header as="h1">Offers of Service</Header>
            <OOSTable data={offersOfService} />
          </Fragment>
        );
      }}
    </Query>
  </Container>
);

export default OOSList;

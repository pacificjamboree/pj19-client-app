import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Container, Loader, Header } from 'semantic-ui-react';

import AdventureLabels from '../components/AdventureLabels';
import PlanDoReview from '../components/PlanDoReview';

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
            <AdventureLabels location={true} adventure={adventure} />
            <p>{adventure.description}</p>

            <Header as="h2">Plan, Do, Review</Header>
            <PlanDoReview
              plan={adventure.pdrPlan}
              do={adventure.pdrDo}
              review={adventure.pdrReview}
              safetyTips={adventure.pdrSafetyTips}
            />
          </Fragment>
        );
      }}
    </Query>
  </Container>
);

export default AdventureDetail;

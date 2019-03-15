import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Header, Loader } from 'semantic-ui-react';

import OOSTable from '../../components/OOSTable';
import DocumentTitle from '../../components/DocumentTitle';

import {
  OFFERS_OF_SERVICE_FRAGMENT,
  ADVENTURE_NAME_ID_FRAGMENT,
} from '../../graphql/fragments';

const QUERY = gql`
  query {
    offersOfService: offerOfServiceOverdueAssignment {
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

const OverdueOOSAssignmentReport = () => (
  <DocumentTitle title="Overdue OOS Assignments">
    <Query query={QUERY}>
      {({ data, loading, error }) => {
        console.log({ data });
        if (error) return <p>Error</p>;
        if (loading) return <Loader />;

        return (
          <>
            <Header as="h1">Overdue OOS Assignments</Header>
            <p>Unassigned OOS whose welcome email was sent over 10 days ago.</p>
            <OOSTable
              defaultSortColumn="oosNumber"
              offersOfService={data.offersOfService}
              adventures={data.adventures}
            />
          </>
        );
      }}
    </Query>
  </DocumentTitle>
);

export default OverdueOOSAssignmentReport;

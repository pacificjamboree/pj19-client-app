import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import DocumentTitle from '../../components/DocumentTitle';
import PatrolTable from '../../components/PatrolTable';

const GET_PATROLS = gql`
  query getPatrols {
    patrols(filters: { workflowState: active }) {
      id
      patrolNumber
      groupName
      patrolName
      numberOfScouts
      numberOfScouters
      totalUnitSize
      subcamp
      fullyPaid
      finalPaymentDate
      patrolScouter {
        id
        email
      }
      adventureSelection {
        workflowState
      }
    }
  }
`;

const PatrolList = () => (
  <DocumentTitle title="Patrols">
    <Container>
      <Header as="h1">Patrols</Header>
      <Query query={GET_PATROLS}>
        {({ data, loading, error }) => {
          if (error) {
            return <p>Error</p>;
          }

          if (loading) {
            return <Loader active content="Loading Patrols" />;
          }

          return (
            <PatrolTable
              patrols={data.patrols}
              defaultSortColumn="patrolNumber"
            />
          );
        }}
      </Query>
    </Container>
  </DocumentTitle>
);

export default PatrolList;

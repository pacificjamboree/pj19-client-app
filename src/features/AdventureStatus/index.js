import React from 'react';
import { Query } from 'react-apollo';
import { Header, Loader } from 'semantic-ui-react';
import gql from 'graphql-tag';
import AdventurePeriodStatusTable from '../../components/AdventurePeriodStatusTable';

const QUERY = gql`
  {
    adventures(filters: { workflowState: active }) {
      id
      _id
      adventureCode
      fullName
      capacityPerPeriod
      scoutOnly
      adventurePeriods {
        id
        startAt
        endAt
        patrolsAssignedCount
        patrols {
          id
        }
        participantsAssigned {
          scouts
          scouters
          total
        }
      }
    }
  }
`;

const AdventureStatus = () => {
  return (
    <>
      <Header as="h2">Adventure Status</Header>
      <Query query={QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <Loader content="Loading Adventures" active />;
          if (error) return <p>Error</p>;
          const { adventures } = data;
          return adventures.map(adventure => (
            <AdventurePeriodStatusTable
              key={adventure.id}
              adventure={adventure}
            />
          ));
        }}
      </Query>
    </>
  );
};

export default AdventureStatus;

import React from 'react';
import { Query } from 'react-apollo';
import { Button, Header, Icon, Loader } from 'semantic-ui-react';
import gql from 'graphql-tag';
import AdventurePeriodStatusTable from '../../components/AdventurePeriodStatusTable';

const QUERY = gql`
  {
    adventures(filters: { workflowState: active, includeFree: true }) {
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
        {({ data, error, loading, refetch }) => {
          if (loading) return <Loader content="Loading Adventures" active />;
          if (error) return <p>Error</p>;
          const { adventures } = data;
          const tables = adventures.map(adventure => (
            <AdventurePeriodStatusTable
              key={adventure.id}
              adventure={adventure}
            />
          ));
          return (
            <>
              <Button
                className="noprint"
                labelPosition="left"
                icon
                onClick={() => refetch()}
              >
                <Icon name="refresh" />
                Refresh
              </Button>
              {tables}
            </>
          );
        }}
      </Query>
    </>
  );
};

export default AdventureStatus;

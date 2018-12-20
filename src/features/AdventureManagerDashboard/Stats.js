import React from 'react';
import { Statistic } from 'semantic-ui-react';
import Query from '../../components/Query';
import { ADVENTURE_MANAGER_DASHBOARD } from '../../graphql/queries';

const Stats = ({ adventureId }) => {
  return (
    <Query
      query={ADVENTURE_MANAGER_DASHBOARD}
      variables={{
        adventureId,
      }}
      fetchPolicy="no-cache"
    >
      {({ data }) => {
        const { oosRequired, oosAssignedCount } = data.adventure;
        return (
          <Statistic.Group widths={2}>
            <Statistic>
              <Statistic.Value>{oosRequired}</Statistic.Value>
              <Statistic.Label>OOS Required</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{oosAssignedCount}</Statistic.Value>
              <Statistic.Label>OOS Assigned</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        );
      }}
    </Query>
  );
};

export default Stats;

import React from 'react';
import { Statistic } from 'semantic-ui-react';
import Query from '../../components/Query';
import { ADMIN_DASHBOARD } from '../../graphql/queries';

const Stats = () => {
  return (
    <Query query={ADMIN_DASHBOARD}>
      {({ data }) => {
        const { offerOfServiceCount } = data;
        return (
          <Statistic.Group widths={3}>
            <Statistic>
              <Statistic.Value>{offerOfServiceCount.total}</Statistic.Value>
              <Statistic.Label>Total OOS</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{offerOfServiceCount.assigned}</Statistic.Value>
              <Statistic.Label>Assigned OOS</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                {offerOfServiceCount.unassigned}
              </Statistic.Value>
              <Statistic.Label>Unassigned OOS</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        );
      }}
    </Query>
  );
};

export default Stats;

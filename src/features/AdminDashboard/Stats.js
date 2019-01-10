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
          <>
            <Statistic.Group widths={2}>
              <Statistic>
                <Statistic.Value>
                  {offerOfServiceCount.required}
                </Statistic.Value>
                <Statistic.Label>Total OOS Required</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {offerOfServiceCount.allocated}
                </Statistic.Value>
                <Statistic.Label>Total OOS Allocated</Statistic.Label>
              </Statistic>
            </Statistic.Group>

            <Statistic.Group widths={2}>
              <Statistic>
                <Statistic.Value>
                  {offerOfServiceCount.adultRequired}
                </Statistic.Value>
                <Statistic.Label>Adult OOS Required</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {offerOfServiceCount.adultAllocated}
                </Statistic.Value>
                <Statistic.Label>Adult OOS Allocated</Statistic.Label>
              </Statistic>
            </Statistic.Group>

            <Statistic.Group widths={2}>
              <Statistic>
                <Statistic.Value>
                  {offerOfServiceCount.assigned}
                </Statistic.Value>
                <Statistic.Label>Assigned OOS</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {offerOfServiceCount.unassigned}
                </Statistic.Value>
                <Statistic.Label>Unassigned OOS</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </>
        );
      }}
    </Query>
  );
};

export default Stats;

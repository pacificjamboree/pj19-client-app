import React from 'react';
import { Header, Loader, Table } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import sortBy from 'lodash.sortby';
import { Link } from '@reach/router';
import formatDate from 'date-fns/format';

const QUERY = gql`
  query patrols {
    patrols(filters: { workflowState: active, scheduleStatus: any }) {
      id
      patrolNumber
      patrolName
      groupName
      fullyPaid
      finalPaymentDate
      fullyScheduled
      numberOfScouts
      numberOfScouters
      totalUnitSize
      schedule {
        hoursScheduled
      }
      scheduleRank
      numberOfFreePeriods
    }
  }
`;

const PatrolScheduleStatus = () => {
  return (
    <>
      <Header as="h2">Patrol Schedule Status</Header>
      <Query query={QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <Loader content="Loading Patrols" active />;
          if (error) return <p>Error</p>;
          const { patrols } = data;
          const full = sortBy(
            patrols.filter(p => p.fullyScheduled),
            'numberOfFreePeriods'
          );
          // const notFull = sortBy(patrols.filter(p => !p.fullyScheduled), [
          //   'scheduleRank',
          // ]);

          return (
            <>
              {/* <Header as="h3">Not Fully Scheduled ({notFull.length})</Header>
              <PatrolTable patrols={notFull} /> */}
              {/* <Header as="h3">Fully Scheduled ({full.length})</Header> */}
              <PatrolTable patrols={full} />
            </>
          );
        }}
      </Query>
    </>
  );
};

const PatrolTable = ({ patrols }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Rank</Table.HeaderCell>
          <Table.HeaderCell>Patrol Number</Table.HeaderCell>
          <Table.HeaderCell>Patrol Name</Table.HeaderCell>
          <Table.HeaderCell>Size</Table.HeaderCell>
          <Table.HeaderCell>Hours Scheduled (of 33)</Table.HeaderCell>
          <Table.HeaderCell>Free Periods</Table.HeaderCell>
          <Table.HeaderCell>Fully Paid</Table.HeaderCell>
          <Table.HeaderCell>Payment Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {patrols.map(patrol => (
          <Table.Row key={patrol.id}>
            <Table.Cell collapsing>{patrol.scheduleRank}</Table.Cell>
            <Table.Cell collapsing>
              <Link to={`/dashboard/patrols/${patrol.patrolNumber}`}>
                {patrol.patrolNumber}
              </Link>
            </Table.Cell>
            <Table.Cell collapsing>{patrol.patrolName}</Table.Cell>
            <Table.Cell collapsing>{patrol.numberOfScouts + 2}</Table.Cell>
            <Table.Cell collapsing>{patrol.schedule.hoursScheduled}</Table.Cell>
            <Table.Cell collapsing>{patrol.numberOfFreePeriods}</Table.Cell>
            <Table.Cell collapsing>
              {patrol.fullyPaid ? 'Yes' : 'No'}
            </Table.Cell>
            <Table.Cell collapsing>
              {patrol.finalPaymentDate
                ? formatDate(patrol.finalPaymentDate, 'YYYY-MM-DD')
                : 'n/a'}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default PatrolScheduleStatus;

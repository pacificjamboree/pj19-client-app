import React, { Fragment } from 'react';
import { Header, Table } from 'semantic-ui-react';
import format from 'date-fns/format';
import { Link } from '@reach/router';

const AdventurePeriodList = ({ adventure }) => (
  <>
    <Header as="h2">Adventure Periods</Header>
    {adventure.adventurePeriods.map(period => {
      const totalAssigned = adventure.scoutOnly
        ? period.participantsAssigned.scouts
        : period.participantsAssigned.total;
      return (
        <Fragment key={period.id}>
          <Header as="h3">{format(period.startAt, 'dddd HH:mm')}</Header>
          <p>Capacity: {adventure.capacityPerPeriod}</p>
          <p>Participants assigned: {totalAssigned}</p>
          <p>Space remaining: {adventure.capacityPerPeriod - totalAssigned}</p>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Patrol Number</Table.HeaderCell>
                <Table.HeaderCell>Patrol Name</Table.HeaderCell>
                <Table.HeaderCell>Size</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {period.patrols.map(patrol => (
                <Table.Row key={patrol.id}>
                  <Table.Cell collapsing>
                    <Link to={`/dashboard/patrols/${patrol.patrolNumber}`}>
                      {patrol.patrolNumber}
                    </Link>
                  </Table.Cell>
                  <Table.Cell collapsing>{patrol.patrolName}</Table.Cell>
                  <Table.Cell collapsing>
                    {patrol.numberOfScouts + 2}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Fragment>
      );
    })}
  </>
);
export default AdventurePeriodList;

import React from 'react';
import { Header, Table } from 'semantic-ui-react';
import format from 'date-fns/format';
import chunk from 'lodash.chunk';

const TableHeader = ({ periods }) => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        {periods.map(p => (
          <Table.HeaderCell key={`header.${p.id}`} textAlign="center">
            {format(p.startAt, 'DD ddd\n HH:mm')}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
};

const TableBody = ({ capacity, periods, adventure }) => {
  const totalField = adventure.scoutOnly ? 'scouts' : 'total';
  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell>Assigned</Table.Cell>
        {periods.map((p, i) => (
          <Table.Cell key={`body.${p.id}`} textAlign="center">
            {p.participantsAssigned[totalField]}
          </Table.Cell>
        ))}
      </Table.Row>
      <Table.Row>
        <Table.Cell>Available</Table.Cell>
        {periods.map(p => (
          <Table.Cell textAlign="center">
            {capacity - p.participantsAssigned[totalField]}
          </Table.Cell>
        ))}
      </Table.Row>
    </Table.Body>
  );
};

const AdventurePeriodStatusTable = ({ adventure }) => {
  const totalAssigned = adventure.adventurePeriods.reduce((prev, curr) => {
    const field = adventure.scoutOnly ? 'scouts' : 'total';
    return prev + curr.participantsAssigned[field];
  }, 0);
  const totalCapacity =
    adventure.capacityPerPeriod * adventure.adventurePeriods.length;

  const chunks = chunk(adventure.adventurePeriods, 12);

  return (
    <>
      <Header as="h3">{adventure.fullName}</Header>
      {adventure.scoutOnly ? <Header as="h4">Scouts Only</Header> : null}
      <p>
        Capacity Per Period: {adventure.capacityPerPeriod}{' '}
        {adventure.scoutOnly ? 'Scouts' : null}
      </p>
      <p>Total Capacity: {totalCapacity}</p>
      <p>Total Participants Assigned: {totalAssigned}</p>
      <p>Total Vacant: {totalCapacity - totalAssigned}</p>
      {chunks.map((chunk, i) => (
        <Table celled definition>
          <TableHeader adventure={adventure} periods={chunk} />
          <TableBody
            adventure={adventure}
            capacity={adventure.capacityPerPeriod}
            periods={chunk}
          />
        </Table>
      ))}
    </>
  );
};

export default AdventurePeriodStatusTable;

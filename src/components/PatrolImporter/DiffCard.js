import React from 'react';
import { Card, Checkbox, Table } from 'semantic-ui-react';

export default ({ patrol, diff, toggleFn }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Patrol {patrol.patrolNumber}</Card.Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Field</Table.HeaderCell>
              <Table.HeaderCell>Old Value</Table.HeaderCell>
              <Table.HeaderCell>New Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {diff.map(d => (
              <Table.Row key={d.path[0]}>
                <Table.Cell>{d.path[0]}</Table.Cell>
                <Table.Cell negative>{d.lhs}</Table.Cell>
                <Table.Cell positive>{d.rhs}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card.Content>
      <Card.Content extra>
        <Checkbox
          toggle
          checked={patrol.patchPatrol}
          label="Update Patrol"
          onChange={() => {
            toggleFn(patrol.patrolNumber);
          }}
        />
      </Card.Content>
    </Card>
  );
};

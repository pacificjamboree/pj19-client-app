import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import formatDate from 'date-fns/format';
import styles from './styles.module.css';

const SUBCAMPS = {
  O: 'Odyssey',
  S: 'Saga',
  V: 'Valley of Kings',
};

const PatrolDetailTable = ({ patrol }) => {
  const {
    groupName,
    patrolName,
    subcamp,
    numberOfScouts,
    numberOfScouters,
    totalUnitSize,
    patrolScouter,
    finalPaymentReceived,
  } = patrol;
  return (
    <Table basic="very">
      <Table.Body>
        <Table.Row>
          <Table.Cell width={4} className={styles.label}>
            Patrol Name
          </Table.Cell>
          <Table.Cell>{patrolName}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell width={4} className={styles.label}>
            Group Name
          </Table.Cell>
          <Table.Cell>{groupName}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell width={4} className={styles.label}>
            Subcamp
          </Table.Cell>
          <Table.Cell>{SUBCAMPS[subcamp]}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell width={4} className={styles.label}>
            Scouts
          </Table.Cell>
          <Table.Cell>{numberOfScouts}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell width={4} className={styles.label}>
            Scouters
          </Table.Cell>
          <Table.Cell>{numberOfScouters}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell width={4} className={styles.label}>
            Total
          </Table.Cell>
          <Table.Cell>{totalUnitSize}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell width={4} className={styles.label}>
            Final Payment Date
          </Table.Cell>
          <Table.Cell>
            {finalPaymentReceived
              ? formatDate(finalPaymentReceived, 'YYYY-MM-DD')
              : 'n/a'}
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell width={4} className={styles.label}>
            Contact Email
          </Table.Cell>
          <Table.Cell>{patrolScouter.email}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

PatrolDetailTable.propTypes = {
  patrol: PropTypes.object.isRequired,
};

export default PatrolDetailTable;

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '@reach/router';
import formatDate from 'date-fns/format';
import styles from './styles.module.css';

const SUBCAMPS = {
  O: 'Olympus',
  S: 'Saga',
  V: 'Valley of Kings',
};

const AdventureSelectionStatus = ({
  adventureSelection: { id, workflowState },
}) => {
  switch (workflowState) {
    case 'defined':
      return (
        <>
          <p>You have not submitted your Adventure Selection.</p>
          <Button as={Link} to={`adventureSelection/${id}/edit`}>
            Start Now
          </Button>
        </>
      );

    case 'draft':
      return (
        <>
          <p>
            Your Adventure Selection is in progress but has not been submitted.
          </p>
          <Button as={Link} to={`adventureSelection/${id}/edit`}>
            Resume
          </Button>
        </>
      );

    default:
      return (
        <>
          <p>Your Adventure Selection has been submitted.</p>
          <Button as={Link} to={`adventureSelection/${id}/`}>
            Review
          </Button>
        </>
      );
  }
};

const AdventureSelectionAdminLink = ({
  adventureSelection: { id, workflowState },
}) => {
  if (workflowState === 'defined') {
    return <p>Adventure Selection has not been started</p>;
  }
  return (
    <span>
      <Link to={`/dashboard/adventureSelection/${id}`}>
        View Adventure Selection
      </Link>{' '}
      ({workflowState})
    </span>
  );
};

const PatrolDetailTable = ({ admin, patrol }) => {
  const {
    id,
    groupName,
    patrolName,
    subcamp,
    numberOfScouts,
    numberOfScouters,
    totalUnitSize,
    patrolScouter,
    finalPaymentDate,
    adventureSelection,
    scheduleRank,
  } = patrol;
  return (
    <Table basic="very">
      <Table.Body>
        {admin ? (
          <Table.Row>
            <Table.Cell width={4} className={styles.label}>
              Adventure Selection
            </Table.Cell>
            <Table.Cell>
              {admin ? (
                <AdventureSelectionAdminLink
                  adventureSelection={adventureSelection}
                />
              ) : (
                <AdventureSelectionStatus
                  adventureSelection={adventureSelection}
                />
              )}
            </Table.Cell>
          </Table.Row>
        ) : null}

        <Table.Row>
          <Table.Cell width={4} className={styles.label}>
            Adventure Schedule
          </Table.Cell>
          <Table.Cell>
            <Link to={`patrolSchedule/${id}`}>
              View your Patrol Adventure Schedule
            </Link>
          </Table.Cell>
        </Table.Row>

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
            {finalPaymentDate
              ? formatDate(finalPaymentDate, 'YYYY-MM-DD')
              : 'No payment infomration received from registrar'}
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell width={4} className={styles.label}>
            Schedule Ranking
          </Table.Cell>
          <Table.Cell>{scheduleRank} / 267</Table.Cell>
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

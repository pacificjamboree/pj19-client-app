import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Container, Grid, Header, Loader, Table } from 'semantic-ui-react';
import formatDate from 'date-fns/format';
import DocumentTitle from '../../components/DocumentTitle';
import NotFound from '../NotFound';

import styles from './styles.module.css';

const SUBCAMPS = {
  O: 'Odyssey',
  S: 'Saga',
  V: 'Valley of Kings',
};

const GET_PATROL = gql`
  query getPatrol($patrolNumber: String!) {
    patrol(search: { searchField: patrolNumber, value: $patrolNumber }) {
      id
      _id
      patrolNumber
      groupName
      patrolName
      subcamp
      numberOfScouts
      numberOfScouters
      totalUnitSize
      workflowState
      finalPaymentReceived
      patrolScouter {
        id
        email
        user {
          id
          username
        }
      }
    }
  }
`;

const PatrolDetail = ({ patrolNumber }) => (
  <DocumentTitle title={`Patrol ${patrolNumber}`}>
    <Container>
      <Query query={GET_PATROL} variables={{ patrolNumber }}>
        {({ error, loading, data }) => {
          if (error) return <p>Error</p>;
          if (loading) return <Loader content="Loading Patrol" />;
          if (!data.patrol) return <NotFound />;
          const {
            id,
            _id,
            patrolNumber,
            groupName,
            patrolName,
            subcamp,
            numberOfScouts,
            numberOfScouters,
            totalUnitSize,
            patrolScouter,
            finalPaymentReceived,
            workflowState,
          } = data.patrol;
          return (
            <Grid stackable divided columns={16}>
              <Grid.Column width={10}>
                <Header as="h1">Patrol {patrolNumber}</Header>
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
              </Grid.Column>
              <Grid.Column width={6}>
                <div className={styles.metadata}>
                  <p>
                    Patrol ID:
                    <br />
                    {id}
                  </p>
                  <p>
                    Database ID:
                    <br />
                    {_id}
                  </p>
                  <p>
                    Patrol Scouter ID:
                    <br />
                    {patrolScouter.id}
                  </p>
                  <p>
                    Patrol Scouter User ID:
                    <br />
                    {patrolScouter.user.id}
                  </p>
                  <p>Workflow State: {workflowState}</p>
                </div>
              </Grid.Column>
            </Grid>
          );
        }}
      </Query>
    </Container>
  </DocumentTitle>
);

PatrolDetail.propTypes = {
  patrolNumber: PropTypes.string,
};

export default PatrolDetail;

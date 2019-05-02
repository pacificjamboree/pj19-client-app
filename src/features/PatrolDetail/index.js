import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Container, Grid, Header, Loader } from 'semantic-ui-react';
import DocumentTitle from '../../components/DocumentTitle';
import NotFound from '../NotFound';
import PatrolDetailTable from '../../components/PatrolDetailTable';

import styles from './styles.module.css';

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
      finalPaymentDate
      patrolScouter {
        id
        email
        user {
          id
          username
        }
      }
      adventureSelection {
        id
        _id
        workflowState
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
          if (loading) return <Loader active content="Loading Patrol" />;
          if (!data.patrol) return <NotFound />;
          const {
            id,
            _id,
            patrolNumber,
            patrolScouter,
            workflowState,
          } = data.patrol;
          return (
            <Grid stackable divided columns={16}>
              <Grid.Column width={10}>
                <Header as="h1">Patrol {patrolNumber}</Header>
                <PatrolDetailTable admin={true} patrol={data.patrol} />
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

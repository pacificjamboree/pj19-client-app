import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Container, Grid, Header, Loader } from 'semantic-ui-react';
import DocumentTitle from '../../components/DocumentTitle';
import NotFound from '../NotFound';
import PatrolDetailTable from '../../components/PatrolDetailTable';
import PatrolScheduleCalendarView from '../../components/PatrolScheduleCalendarView';
import AddAdventurePeriodToPatrolPopup from '../../components/AddAdventurePeriodToPatrolPopup';

import 'react-big-calendar/lib/css/react-big-calendar.css';
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
      schedule {
        periods {
          id
          _id
          startAt
          endAt
          adventure {
            name
            adventureCode
            fullName
            location
            premiumAdventure
          }
        }
      }
    }
  }
`;

const PatrolDetail = ({ patrolNumber }) => {
  const [addAdventureModalOpen, setAddAdventureModalOpen] = useState(false);

  return (
    <DocumentTitle title={`Patrol ${patrolNumber}`}>
      <Container>
        <Query
          query={GET_PATROL}
          variables={{ patrolNumber }}
          fetchPolicy="network-only"
        >
          {({ error, loading, data, ...rest }) => {
            console.log({ error, loading, data, rest });
            if (error) return <p>Error</p>;
            if (loading) return <Loader active content="Loading Patrol" />;
            if (!data.patrol) {
              console.log({ data });
              return <NotFound />;
            }
            const {
              id,
              _id,
              patrolNumber,
              patrolScouter,
              workflowState,
            } = data.patrol;
            return (
              <>
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

                <AddAdventurePeriodToPatrolPopup
                  open={addAdventureModalOpen}
                  modalToggle={setAddAdventureModalOpen}
                  patrol={data.patrol}
                />

                <div style={{ height: 'calc(100vh - 100px)' }}>
                  <PatrolScheduleCalendarView patrol={data.patrol} />
                </div>
              </>
            );
          }}
        </Query>
      </Container>
    </DocumentTitle>
  );
};

PatrolDetail.propTypes = {
  patrolNumber: PropTypes.string,
};

export default PatrolDetail;

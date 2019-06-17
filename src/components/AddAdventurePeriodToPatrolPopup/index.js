import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Button, Dropdown, Grid, Icon, Loader, Modal } from 'semantic-ui-react';
import gql from 'graphql-tag';
import sortBy from 'lodash.sortby';
import formatDate from 'date-fns/format';

import './style.css';
import styles from './style.module.css';

const GET_ADVENTURES = gql`
  query {
    adventures(
      filters: { workflowState: active, hidden: false, includeFree: true }
    ) {
      id
      _id
      name
      adventurePeriods {
        id
        _id
        startAt
        endAt
        type
        capacityRemaining
        childPeriods {
          id
        }
        assignWith {
          id
        }
      }
    }
  }
`;

const ADD_PERIOD = gql`
  mutation addAdventurePeriodToPatrolSchedule(
    $adventurePeriodId: ID!
    $patrolId: ID!
  ) {
    addAdventurePeriodToPatrolSchedule(
      input: { patrolId: $patrolId, adventurePeriodId: $adventurePeriodId }
    ) {
      patrol {
        id
        schedule {
          periods {
            id
          }
        }
      }
    }
  }
`;

const AddAdventurePeriodToPatrolPopup = ({ patrol, open, modalToggle }) => {
  const [selectedAdventure, setSelectedAdventure] = useState();
  const [selectedPeriod, setSelectedPeriod] = useState();

  return (
    <Modal
      closeOnDimmerClick={false}
      closeOnDocumentClick={false}
      open={open}
      trigger={
        <Button icon labelPosition="left" onClick={() => modalToggle(true)}>
          <Icon name="calendar plus outline" />
          Add Adventure to Schedule
        </Button>
      }
    >
      <Modal.Header>Add Adventure to Patrol Schedule</Modal.Header>
      <Modal.Content>
        <Modal.Description className={styles.modalDescription}>
          <Query query={GET_ADVENTURES} fetchPolicy="network-only">
            {({ data, loading, error }) => {
              if (loading) {
                return (
                  <Loader active content="Loading Adventures" size="small" />
                );
              }
              if (error) {
                console.error(error);
                return null;
              }

              const { adventures } = data;
              const adventureDropdownSelections = sortBy(
                adventures.map(a => ({
                  text: a.name,
                  value: a.id,
                })),
                'text'
              );

              const periodDropdownSelections = selectedAdventure
                ? adventures
                    .find(a => a.id === selectedAdventure)
                    .adventurePeriods.map(p => ({
                      text: `${formatDate(
                        p.startAt,
                        'dddd HH:mm'
                      )} – Capacity Remaining: ${p.capacityRemaining}`,
                      value: p.id,
                    }))
                : null;

              return (
                <div>
                  <p>
                    First, choose an Adventure from the list below. Then, select
                    an adventure period. Pay close attention to the remaining
                    capacity for each period before assigning one to the
                    Patrol's schedule.
                  </p>
                  <Grid>
                    <Grid.Column width={8}>
                      <Dropdown
                        style={{ marginRight: '2em' }}
                        placeholder="Select an Adventure"
                        search
                        selection
                        fluid
                        options={adventureDropdownSelections}
                        onChange={(e, { value }) => {
                          setSelectedAdventure(value);
                        }}
                      />
                    </Grid.Column>
                    <Grid.Column width={8}>
                      {periodDropdownSelections ? (
                        <Dropdown
                          placeholder="Select an Adventure Period"
                          search
                          selection
                          fluid
                          options={periodDropdownSelections}
                          onChange={(e, { value }) => {
                            setSelectedPeriod(value);
                          }}
                        />
                      ) : null}
                    </Grid.Column>
                  </Grid>
                </div>
              );
            }}
          </Query>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Cancel" onClick={() => modalToggle(false)} />
        <Mutation
          mutation={ADD_PERIOD}
          variables={{
            patrolId: patrol.id,
            adventurePeriodId: selectedPeriod,
          }}
          onCompleted={() => {
            modalToggle(false);
          }}
        >
          {(mutationFn, { data, error }) => (
            <Button
              primary
              disabled={!selectedPeriod}
              icon="calendar plus outline"
              content="Add to Schedule"
              onClick={() => {
                // modalToggle(false);
                mutationFn();
              }}
            />
          )}
        </Mutation>
      </Modal.Actions>
    </Modal>
  );
};

export default AddAdventurePeriodToPatrolPopup;

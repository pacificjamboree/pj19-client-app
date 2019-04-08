import React, { Component } from 'react';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Button,
  Checkbox,
  Header,
  Icon,
  Label,
  Segment,
} from 'semantic-ui-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { navigate } from '@reach/router';
import { pushFlashMessage } from '../../lib/flashMessage';

import styles from './style.module.css';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const UPDATE_ADVENTURE_SELECTION = gql`
  mutation updateAdventureSelection(
    $id: ID!
    $update: PatrolAdventureSelectionUpdate!
  ) {
    updatePatrolAdventureSelection(
      input: { id: $id, PatrolAdventureSelection: $update }
    ) {
      PatrolAdventureSelection {
        workflowState
        id
        selectionOrder {
          id
          fullName
        }
      }
    }
  }
`;

class AdventureSelectionEditForm extends Component {
  constructor(props) {
    super(props);
    const { adventures, adventureSelection } = props;
    const state = {
      hasAcceptedTerms: false,
      adventureSelection,
    };
    if (state.adventureSelection.selectionOrder.length === 0) {
      state.adventureSelection.selectionOrder = adventures.map(a => ({
        ...a,
      }));
    }
    this.state = state;
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  toggleWantScuba = () => {
    const newValue = !this.state.adventureSelection.wantScuba;
    this.setState({
      adventureSelection: {
        ...this.state.adventureSelection,
        wantScuba: newValue,
      },
    });
    this.props.mutate({
      variables: {
        id: this.state.adventureSelection.id,
        update: {
          wantScuba: newValue,
          workflowState: 'draft',
        },
      },
    });
  };

  toggleWantExtraFreePeriod = () => {
    const newValue = !this.state.adventureSelection.wantExtraFreePeriod;
    this.setState({
      adventureSelection: {
        ...this.state.adventureSelection,
        wantExtraFreePeriod: newValue,
      },
    });
    this.props.mutate({
      variables: {
        id: this.state.adventureSelection.id,
        update: {
          wantExtraFreePeriod: newValue,
          workflowState: 'draft',
        },
      },
    });
  };

  toggleHasAcceptedTerms = () => {
    this.setState({
      hasAcceptedTerms: !this.state.hasAcceptedTerms,
    });
  };

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newOrder = reorder(
      this.state.adventureSelection.selectionOrder,
      result.source.index,
      result.destination.index
    );
    this.setState({
      adventureSelection: {
        ...this.state.adventureSelection,
        selectionOrder: newOrder,
      },
    });

    this.props.mutate({
      variables: {
        id: this.state.adventureSelection.id,
        update: {
          selectionOrder: newOrder.map(a => a._id),
          workflowState: 'draft',
        },
      },
    });
  }

  onSubmit = mutationFn => {
    const {
      id,
      selectionOrder,
      wantScuba,
      wantExtraFreePeriod,
    } = this.state.adventureSelection;
    const update = {
      wantScuba,
      wantExtraFreePeriod,
      workflowState: 'saved',
      selectionOrder: selectionOrder.map(a => a._id),
    };

    mutationFn({
      variables: {
        id,
        update,
      },
    });
  };
  render() {
    const { hasAcceptedTerms, adventureSelection } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Segment>
                <p>
                  Drag and drop the Adventures in the list below into the
                  priority order determined by your Patrol. The Adventure in
                  slot #1 is the Adventure your patrol wants the most, and so on
                  down the list.
                </p>
                {adventureSelection.selectionOrder.map((a, index) => {
                  return (
                    <Draggable key={a._id} draggableId={a._id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          className={styles.dragrow}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <>
                            <Label
                              color={snapshot.isDragging ? 'green' : 'teal'}
                              size="large"
                              circular
                            >
                              {snapshot.isDragging ? ' ' : index + 1}
                            </Label>

                            <span style={{ paddingLeft: '1em' }}>
                              {a.premiumAdventure ? (
                                <Icon color="yellow" name="star" />
                              ) : null}
                              {a.fullName}
                            </span>
                          </>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Segment>
            </div>
          )}
        </Droppable>

        <Segment>
          <Checkbox
            style={{ display: 'block' }}
            checked={adventureSelection.wantExtraFreePeriod}
            label="Assign an extra free period"
            onClick={this.toggleWantExtraFreePeriod}
          />
        </Segment>

        <Segment color="red">
          <Header as="h2">Important Notes</Header>
          <p>
            By submitting your Adventure Selection, you acknowledge that you
            have read and understand the following:
          </p>
          <ul>
            <li>Adventure Selections can not be changed once submitted.</li>
            <li>
              The list of Adventures offered at PJ is subject to change. If
              additional Adventures are added, you will be notified and have the
              chance to amend your Adventure Seleciton.
            </li>
            <li>
              This Adventure Selection is used to determine your Patrol's
              preferences for Adventures. Your actual Adventure Schedule is
              assigned based on your Patrol's place in the assignment order as
              determined by the date your final PJ registration payment was
              received.
            </li>
            <li>
              Group A Adventures are indicated with a gold star on the list
              above. Your Patrol <strong>may</strong> receive one Group A
              Adventure on your final schedule; this is not guaranteed. Patrols
              may receive an additional Group A activity if space permits.
            </li>
          </ul>
          <strong>
            <Checkbox
              label="I have read and understand the above notes"
              style={{ display: 'block' }}
              checked={hasAcceptedTerms}
              onClick={this.toggleHasAcceptedTerms}
              size="large"
            />
          </strong>
        </Segment>

        <Mutation
          mutation={UPDATE_ADVENTURE_SELECTION}
          onCompleted={() => {
            const { patrolNumber } = adventureSelection.patrol;
            pushFlashMessage(this.props.client, {
              kind: 'success',
              message: `Adventure Selection for Patrol ${patrolNumber} submitted`,
            });
            navigate(`/dashboard?patrol=${patrolNumber}`);
          }}
          onError={error => {
            pushFlashMessage(this.props.client, {
              kind: 'error',
              message:
                'An error occurred while submitting your Adventure Selection',
              error: error.message,
            });
          }}
        >
          {(mutationFn, { data, error }) => {
            return (
              <Button
                color="teal"
                icon
                labelPosition="left"
                disabled={!hasAcceptedTerms}
                onClick={() => {
                  this.onSubmit(mutationFn);
                }}
              >
                <Icon name="check" />
                Submit
              </Button>
            );
          }}
        </Mutation>
      </DragDropContext>
    );
  }
}

export default graphql(UPDATE_ADVENTURE_SELECTION)(AdventureSelectionEditForm);

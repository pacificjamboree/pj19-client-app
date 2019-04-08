import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Header, Loader, Segment } from 'semantic-ui-react';
import { Redirect } from '@reach/router';
import DocumentTitle from '../../components/DocumentTitle';
import AdventureSelectionEditForm from '../../components/AdventureSelectionEditForm';

import styles from './style.module.css';

const GET_ADVENTURE_SELECTION = gql`
  query getAdventureSelection($id: ID!) {
    patrolAdventureSelection: patrolAdventureSelection(
      search: { searchField: id, value: $id }
    ) {
      id
      wantScuba
      wantExtraFreePeriod
      workflowState
      selectionOrder {
        id
        _id
        fullName
        premiumAdventure
      }
      patrol {
        patrolNumber
      }
    }
    adventures: adventures(filters: { workflowState: active, hidden: false }) {
      id
      _id
      fullName
      premiumAdventure
    }
  }
`;

const Wrapper = ({ id }) => (
  <Query query={GET_ADVENTURE_SELECTION} variables={{ id }}>
    {({ error, loading, data, client }) => {
      if (error) {
        console.log(error);
        return <p>Error</p>;
      }
      if (loading) return <Loader active label="Loading Adventure Selection" />;

      const { adventures, patrolAdventureSelection } = data;
      const { patrolNumber } = data.patrolAdventureSelection.patrol;
      const { workflowState } = patrolAdventureSelection;

      if (workflowState === 'saved' || workflowState === 'locked') {
        return <Redirect noThrow to={`/dashboard/adventureSelection/${id}`} />;
      }

      return (
        <DocumentTitle title={`Adventure Selection - Patrol ${patrolNumber}`}>
          <>
            <Header as="h1">Adventure Selection - Patrol {patrolNumber}</Header>
            <Segment>
              <Header as="h2">Instructions</Header>
              <p>
                Follow these steps to complete your Adventure Selection for
                Patrol {patrolNumber}:
              </p>
              <ul className={styles.instructions}>
                <li>
                  Drag and drop the Adventures in the list below into the
                  priority order determined by your Patrol. The Adventure in
                  slot #1 is the Adventure your patrol wants the most, and so on
                  down the list.
                </li>
                <li>
                  Group A Adventures are indicated with a gold star on the list
                  below. Your Patrol <strong>may</strong> receive one Group A
                  Adventure on your final schedule; this is not guaranteed.
                  Patrols may receive an additional Group A activity if space
                  permits.
                </li>
                <li>
                  You have the option of requesting a guaranteed additional free
                  period. If your Patrol wants an extra free period, check the
                  "Assign an extra free period" box. Note that all patrols
                  automatically receive one free period, and your patrol may
                  receive more than one depending on your location in the
                  assignment order.
                </li>
                <li>
                  Your Adventure Selection will save in the background as you
                  re-order the Adventures. You can leave this page and come back
                  at any time.
                </li>
                <li>
                  Once you have arranged the Adventures in your Patrol's
                  preferred order, review the notes at the bottom of the page
                  and click "Submit". Once you have submitted your Adventure
                  Selection you will not be able to change it, so review your
                  selections before submitting the form.
                </li>
                <li>
                  If you are the Contact Scouter for more than one Patrol, make
                  sure to complete an Adventure Selection for each Patrol.
                </li>
                <li>
                  Adventure Schedule changes will be available during the
                  Jamboree. Schedule changes are not permitted before the start
                  of the Jamboree except in extraordinary cicrumstances.
                </li>
              </ul>
            </Segment>
            <AdventureSelectionEditForm
              adventures={adventures}
              adventureSelection={patrolAdventureSelection}
              client={client}
            />
          </>
        </DocumentTitle>
      );
    }}
  </Query>
);

export default Wrapper;

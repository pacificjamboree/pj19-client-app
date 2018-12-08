import React from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { Button, Icon } from 'semantic-ui-react';
import {
  GET_OFFER_OF_SERVICE_BY_OOS_NUMBER,
  ASSIGN_MANAGER_TO_ADVENTURE,
} from '../../graphql/queries';
import { pushFlashMessage } from '../../lib/flashMessage';

const AddAdventureManagerButton = ({
  client,
  offerOfService: { id, oosNumber, assignment, isAdventureManager },
}) => (
  <Mutation
    mutation={ASSIGN_MANAGER_TO_ADVENTURE}
    refetchQueries={[
      {
        query: GET_OFFER_OF_SERVICE_BY_OOS_NUMBER,
        variables: { oosNumber },
      },
    ]}
    update={cache => {
      pushFlashMessage(client, {
        kind: 'success',
        message: 'OOS is now an Adventure Manager',
      });
    }}
  >
    {(mutation, { data, error }) => (
      <Button
        icon
        labelPosition="left"
        onClick={() => {
          mutation({
            variables: {
              adventureId: assignment.id,
              oosId: id,
            },
          });
        }}
      >
        <Icon name="star" />
        Make Adventure Manager
      </Button>
    )}
  </Mutation>
);

export default withApollo(AddAdventureManagerButton);

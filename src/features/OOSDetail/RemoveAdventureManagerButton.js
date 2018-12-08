import React from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { Button, Icon } from 'semantic-ui-react';
import {
  GET_OFFER_OF_SERVICE_BY_OOS_NUMBER,
  REMOVE_MANAGER_FROM_ADVENTURE,
} from '../../graphql/queries';
import { pushFlashMessage } from '../../lib/flashMessage';

const RemoveAdventureManagerButton = ({
  client,
  offerOfService: { id, oosNumber, assignment, isAdventureManager },
}) => (
  <Mutation
    mutation={REMOVE_MANAGER_FROM_ADVENTURE}
    refetchQueries={[
      {
        query: GET_OFFER_OF_SERVICE_BY_OOS_NUMBER,
        variables: { oosNumber },
      },
    ]}
    update={cache => {
      pushFlashMessage(client, {
        kind: 'success',
        message: 'OOS is no longer an Adventure Manager',
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
        Remove as Adventure Manager
      </Button>
    )}
  </Mutation>
);

export default withApollo(RemoveAdventureManagerButton);

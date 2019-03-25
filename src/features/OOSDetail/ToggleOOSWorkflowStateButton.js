import { Mutation, withApollo } from 'react-apollo';
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { pushFlashMessage } from '../../lib/flashMessage';
import { GET_OFFER_OF_SERVICE_BY_OOS_NUMBER } from '../../graphql/queries';

const TOGGLE_OOS_WORKFLOW_STATE = gql`
  mutation toggleOOSWorkflowState($id: ID!, $workflowState: WorkflowState!) {
    toggleOfferOfServiceWorkflowState(
      input: { id: $id, workflowState: $workflowState }
    ) {
      OfferOfService {
        fullName
        workflowState
        assigned
      }
    }
  }
`;

const ToggleOOSWorkflowStateButton = ({ client, offerOfService }) => {
  const { id, workflowState } = offerOfService;
  const desiredState = workflowState === 'active' ? 'deleted' : 'active';

  return (
    <Mutation
      errorPolicy="all"
      mutation={TOGGLE_OOS_WORKFLOW_STATE}
      refetchQueries={[
        {
          query: GET_OFFER_OF_SERVICE_BY_OOS_NUMBER,
          variables: { oosNumber: offerOfService.oosNumber },
        },
      ]}
      update={() => {
        pushFlashMessage(client, {
          kind: 'success',
          message: `Offer of Service toggled to ${desiredState}`,
        });
      }}
      onError={error => {
        pushFlashMessage(client, {
          kind: 'error',
          message: `An error occurred while changing this OOS state to ${desiredState}`,
          error: error.message,
        });
      }}
    >
      {(mutate, { data, error }) => {
        const buttonTitle =
          desiredState === 'deleted'
            ? 'Delete Offer Of Service'
            : 'Restore Offer Of Service';
        const icon =
          desiredState === 'deleted' ? 'user delete' : 'user outline';
        return (
          <Button
            icon
            color={desiredState === 'deleted' ? 'red' : null}
            labelPosition="left"
            title={buttonTitle}
            onClick={() => {
              const variables = {
                id,
                workflowState: desiredState,
              };
              if (desiredState === 'deleted') {
                if (
                  window.confirm(
                    'Are you sure you want to delete this offer of service?'
                  )
                ) {
                  mutate({ variables });
                }
              } else {
                mutate({ variables });
              }
            }}
          >
            <Icon name={icon} />
            {buttonTitle}
          </Button>
        );
      }}
    </Mutation>
  );
};

export default withApollo(ToggleOOSWorkflowStateButton);

import React from 'react';
import { Query } from 'react-apollo';
import {
  Button,
  Grid,
  Header,
  Icon,
  Loader,
  Message,
  Segment,
} from 'semantic-ui-react';
import { Link } from '@reach/router';
import gql from 'graphql-tag';
import DocumentTitle from '../../components/DocumentTitle';
import UserHasRole from '../../components/UserHasRole';

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
  }
`;
const AdventureSelectionStatus = ({
  adventureSelection: { id, workflowState },
}) => {
  switch (workflowState) {
    case 'defined':
      return (
        <Message warning icon>
          <Icon name="warning sign" />
          <Message.Content>
            <Message.Header>
              You have not submitted your Adventure Selection.
            </Message.Header>
            <Button style={{ marginTop: '1em' }} as={Link} to={`edit`}>
              Start Now
            </Button>
          </Message.Content>
        </Message>
      );

    case 'draft':
      return (
        <Message warning icon>
          <Icon name="warning sign" />
          <Message.Content>
            <Message.Header>
              Your Adventure Selection is in progress but has not been
              submitted.
            </Message.Header>
            <Button style={{ marginTop: '1em' }} as={Link} to={`edit`}>
              Resume
            </Button>
          </Message.Content>
        </Message>
      );

    default:
      return (
        <Message success icon>
          <Icon name="circle check" />
          <Message.Content>
            <Message.Header>
              Your Adventure Selection has been submitted.
            </Message.Header>
          </Message.Content>
        </Message>
      );
  }
};

const AdventureSelectionView = ({ id }) => (
  <Query query={GET_ADVENTURE_SELECTION} variables={{ id }}>
    {({ error, loading, data }) => {
      if (error) {
        console.log(error);
        return <p>Error</p>;
      }
      if (loading) return <Loader active label="Loading Adventure Selection" />;

      const { patrolAdventureSelection } = data;
      const { patrolNumber } = data.patrolAdventureSelection.patrol;
      return (
        <DocumentTitle title={`Adventure Selection - Patrol ${patrolNumber}`}>
          <>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  {' '}
                  <Header as="h1">
                    Adventure Selection - Patrol {patrolNumber}
                  </Header>
                </Grid.Column>
                <UserHasRole userRoles={['admin']}>
                  <Grid.Column textAlign="right">
                    <Link to={`edit`}>
                      <Button icon labelPosition="left" color="teal">
                        <Icon name="edit" />
                        Edit
                      </Button>
                    </Link>
                  </Grid.Column>
                </UserHasRole>
              </Grid.Row>
            </Grid>

            <AdventureSelectionStatus
              adventureSelection={patrolAdventureSelection}
            />
            <Segment>
              Extra free period requested:{' '}
              <strong>
                {patrolAdventureSelection.wantExtraFreePeriod ? 'Yes' : 'No'}
              </strong>
            </Segment>
            <Segment>
              <Header as="h2">Adventure Selection Order</Header>
              <ol>
                {patrolAdventureSelection.selectionOrder.map(a => (
                  <li key={a._id}>{a.fullName}</li>
                ))}
              </ol>
            </Segment>
          </>
        </DocumentTitle>
      );
    }}
  </Query>
);

export default AdventureSelectionView;

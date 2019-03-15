import React from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { Header } from 'semantic-ui-react';
import { pushFlashMessage } from '../../lib/flashMessage';
import { GET_ADVENTURE_BY_ID, CREATE_ADVENTURE } from '../../graphql/queries';
import AdventureCreateForm from '../../components/AdventureCreateForm';
import DocumentTitle from '../../components/DocumentTitle';

const AdventureCreate = ({ client, navigate }) => (
  <DocumentTitle title="Add New Adventure">
    <>
      <Header as="h1">Create New Adventure</Header>
      <Mutation
        mutation={CREATE_ADVENTURE}
        onError={error => {
          pushFlashMessage(client, {
            message: 'An error occured while trying to save this adventure.',
            kind: 'error',
            error: JSON.stringify(error, null, 2),
          });
          window.scrollTo(0, 0);
        }}
        onCompleted={({ createAdventure: { Adventure } }) => {
          navigate(`../${Adventure.id}`);
        }}
        update={(cache, mutationResult) => {
          const cacheData = mutationResult.data.createAdventure.Adventure;
          cache.writeQuery({
            query: GET_ADVENTURE_BY_ID,
            data: {
              adventure: cacheData,
            },
          });
        }}
      >
        {(mutation, { data, error }) => {
          return <AdventureCreateForm mutate={mutation} />;
        }}
      </Mutation>
    </>
  </DocumentTitle>
);

export default withApollo(AdventureCreate);

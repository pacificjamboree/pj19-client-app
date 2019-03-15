import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Header, Loader } from 'semantic-ui-react';
import DocumentTitle from '../components/DocumentTitle';
import {
  GET_ADVENTURE_BY_ID,
  UPDATE_ADVENTURE_BY_ID,
} from '../graphql/queries';
import AdventureEditForm from '../components/AdventureEditForm';

const AdventureEdit = ({ id, navigate, navigateToAfterMutataion }) => (
  <Query
    query={GET_ADVENTURE_BY_ID}
    variables={{ id }}
    fetchPolicy="network-only"
  >
    {({ data, loading, error }) => {
      if (loading) return <Loader active />;
      if (error) return <p>Error</p>;
      const { adventure } = data;
      return (
        <DocumentTitle title={`Edit ${adventure.name}`}>
          <>
            <Header as="h1">Edit Adventure</Header>
            <Mutation
              mutation={UPDATE_ADVENTURE_BY_ID}
              onCompleted={data => {
                navigate(
                  navigateToAfterMutataion ||
                    `/adventures/${data.updateAdventure.Adventure.id}`
                );
              }}
              update={(cache, mutationResult) => {
                const cacheData = mutationResult.data.updateAdventure.Adventure;
                cache.writeQuery({
                  query: GET_ADVENTURE_BY_ID,
                  data: {
                    adventure: cacheData,
                  },
                });
              }}
            >
              {(mutation, { data, error }) => {
                return (
                  <AdventureEditForm adventure={adventure} mutate={mutation} />
                );
              }}
            </Mutation>
          </>
        </DocumentTitle>
      );
    }}
  </Query>
);

export default AdventureEdit;

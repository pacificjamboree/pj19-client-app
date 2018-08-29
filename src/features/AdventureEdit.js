import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Header, Loader } from 'semantic-ui-react';
import { navigate } from '@reach/router';
import {
  GET_ADVENTURE_BY_ID,
  UPDATE_ADVENTURE_BY_ID,
} from '../graphql/queries';
import AdventureEditForm from '../components/AdventureEditForm';

const AdventureEdit = ({ id }) => (
  <Query
    query={GET_ADVENTURE_BY_ID}
    variables={{ id }}
    fetchPolicy="network-only"
  >
    {({ data: { adventure }, loading, error }) => {
      if (loading) return <Loader active />;
      if (error) return <p>Error</p>;
      return (
        <Fragment>
          <Header as="h1">Edit Adventure</Header>
          <Mutation
            mutation={UPDATE_ADVENTURE_BY_ID}
            onCompleted={data => {
              navigate(`/adventures/${data.updateAdventure.Adventure.id}`);
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
        </Fragment>
      );
    }}
  </Query>
);

export default AdventureEdit;

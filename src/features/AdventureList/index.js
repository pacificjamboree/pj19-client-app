import React from 'react';
import { Header } from 'semantic-ui-react';
import Query from '../../components/Query';
import AdventureListTable from '../../components/AdventureListTable';
import { GET_ADVENTURE_LIST } from '../../graphql/queries';

const AdventureList = () => (
  <>
    <Header as="h1">Adventures</Header>
    <Query query={GET_ADVENTURE_LIST} variables={{ workflowState: 'active' }}>
      {({ data }) => {
        const adventures = data.adventures.map(a => ({
          oosAssignedCount: a.OffersOfServiceConnection.edges.length,
          ...a,
        }));
        return (
          <AdventureListTable
            adventures={adventures}
            defaultSortColumn="name"
          />
        );
      }}
    </Query>
  </>
);

export default AdventureList;

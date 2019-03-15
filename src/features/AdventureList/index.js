import React from 'react';
import { Header } from 'semantic-ui-react';
import Query from '../../components/Query';
import AdventureListTable from '../../components/AdventureListTable';
import DocumentTitle from '../../components/DocumentTitle';
import { GET_ADVENTURE_TABLE } from '../../graphql/queries';

const AdventureList = () => (
  <DocumentTitle title="Adventure List">
    <>
      <Header as="h1">Adventures</Header>
      <Query
        query={GET_ADVENTURE_TABLE}
        variables={{ workflowState: 'active' }}
      >
        {({ data }) => (
          <AdventureListTable
            adventures={data.adventures}
            defaultSortColumn="name"
          />
        )}
      </Query>
    </>
  </DocumentTitle>
);

export default AdventureList;

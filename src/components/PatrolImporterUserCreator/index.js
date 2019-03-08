import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const query = gql`
  query getImportedPatrolScouters($importId: String!) {
    patrolScouters(filters: { workflowState: active, importId: $importId }) {
      id
      fullName
    }
  }
`;

const PatrolImporterUserCreator = ({ importId, stepUpdater }) => (
  <Query query={query} variables={{ importId }}>
    {({ data, loading, error }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;

      return <pre>{JSON.stringify(data, null, 2)}</pre>;
    }}
  </Query>
);

export default PatrolImporterUserCreator;

import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const query = gql`
  query getImportedPatrolScouters($importId: String!) {
    patrolScouters(filters: { workflowState: active, importId: $importId }) {
      id
      _id
      email
      user {
        id
      }
    }
  }
`;

const PatrolImporterUserCreator = ({ importId, stepUpdater }) => (
  <Query query={query} variables={{ importId }}>
    {({ data, loading, error }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      const { patrolScouters } = data;
      const patrolScoutersWithoutUsers = patrolScouters.filter(p => !p.user);
      const input = patrolScoutersWithoutUsers.map(p => ({
        username: p.email,
        oosId: p._id,
        workflowState: 'defined',
      }));
      return <pre>{JSON.stringify(input, null, 2)}</pre>;
    }}
  </Query>
);

export default PatrolImporterUserCreator;

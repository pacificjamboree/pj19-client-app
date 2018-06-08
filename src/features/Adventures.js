import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
  query adventures($workflowState: WorkflowState) {
    adventures(filters: { workflowState: [$workflowState] }) {
      name
      id
    }
  }
`;

const Adventures = ({ workflowState = 'active' }) => {
  return (
    <Query
      query={QUERY}
      variables={{ workflowState }}
      errorPolicy="ignore"
      notifyOnNetworkStatusChange
      displayName="AdventureQuery"
    >
      {({ loading, error, data, refetch, networkStatus }) => {
        if (networkStatus === 4) return <p>Refetching!</p>;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :( --> {error.message}</p>;

        const adventures = data.adventures.map(a => (
          <li key={a.id}>{a.name}</li>
        ));

        return (
          <div>
            <ul>{adventures}</ul>
            <button onClick={() => refetch()}>Refetch!</button>
          </div>
        );
      }}
    </Query>
  );
};

export default Adventures;

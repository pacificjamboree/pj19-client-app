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
  console.log(workflowState);
  return (
    <Query
      query={QUERY}
      variables={{ workflowState }}
      errorPolicy="ignore"
      notifyOnNetworkStatusChange
      displayName="AdventureQuery"
    >
      {({ loading, error, data, refetch, networkStatus }) => {
        console.log(networkStatus);
        if (networkStatus === 4) return <p>Refetching!</p>;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :( --> {error.message}</p>;
        return [
          data.adventures.map(({ name, id }) => <h2 key={id}>{name}</h2>),
          <button onClick={() => refetch()}>Refetch!</button>,
        ];
      }}
    </Query>
  );
};

export default Adventures;

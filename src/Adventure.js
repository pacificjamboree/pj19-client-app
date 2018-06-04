import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
  {
    adventures(filters: { workflowState: active }) {
      name
      # OffersOfServiceConnection {
      #   edges {
      #     node {
      #       fullName
      #     }
      #   }
      # }
    }
  }
`;

const Adventures = () => (
  <Query query={QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :( --> {error.message}</p>;
      return data.adventures.map(({ name }) => <h2 key={name}>{name}</h2>);
    }}
  </Query>
);

export default Adventures;

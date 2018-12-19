import React from 'react';
// import Query from '../../components/Query';
import { Query } from 'react-apollo';
import { Loader } from 'semantic-ui-react';
import AdminDashboard from '../AdminDashboard';
import AdventureManagerDashboard from '../AdventureManagerDashboard';
import { GET_DASHBOARD_VIEWER } from '../../graphql/queries';

export default ({ client }) => (
  <Query query={GET_DASHBOARD_VIEWER} fetchPolicy="network-only">
    {({ data, loading, error }) => {
      if (loading) return <Loader active />;
      if (data.viewer) {
        const { roles } = data.viewer;
        if (roles.includes('admin')) {
          return <AdminDashboard user={data.viewer} />;
        } else if (roles.includes('patrolScouter')) {
          return <p>PatrolScouter Dashboard</p>;
        } else if (roles.includes('adventureManager')) {
          return <AdventureManagerDashboard user={data.viewer} />;
        }
      }
    }}
  </Query>
);

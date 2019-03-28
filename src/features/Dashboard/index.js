import React from 'react';
// import Query from '../../components/Query';
import { Query } from 'react-apollo';
import { Loader } from 'semantic-ui-react';
import DocumentTitle from '../../components/DocumentTitle';
import AdminDashboard from '../AdminDashboard';
import AdventureManagerDashboard from '../AdventureManagerDashboard';
import PatrolScouterDashboard from '../PatrolScouterDashboard';

import { GET_DASHBOARD_VIEWER } from '../../graphql/queries';

export default ({ client }) => (
  <DocumentTitle title="Dashboard">
    <Query query={GET_DASHBOARD_VIEWER} fetchPolicy="network-only">
      {({ data, loading, error }) => {
        if (loading) return <Loader active />;
        if (error) {
          console.log(error);
          return <p>Error</p>;
        }
        if (data.viewer) {
          const { roles } = data.viewer;
          if (roles.includes('admin')) {
            return <AdminDashboard user={data.viewer} />;
          } else if (roles.includes('patrolScouter')) {
            return <PatrolScouterDashboard user={data.viewer} />;
          } else if (roles.includes('adventureManager')) {
            return <AdventureManagerDashboard user={data.viewer} />;
          }
        } else {
          return <p>You are not logged in.</p>;
        }
      }}
    </Query>
  </DocumentTitle>
);

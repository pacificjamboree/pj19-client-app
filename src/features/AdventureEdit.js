import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Header, Loader } from 'semantic-ui-react';
import { GET_ADVENTURE_BY_ID } from '../graphql/queries';
import AdventureEditForm from '../components/AdventureEditForm';

const AdventureEdit = ({ id }) => (
  <Query query={GET_ADVENTURE_BY_ID} variables={{ id }}>
    {({ data: { adventure }, loading, error }) => {
      if (loading) return <Loader active />;
      if (error) return <p>Error</p>;

      return (
        <Fragment>
          <Header as="h1">Edit Adventure</Header>
          <AdventureEditForm adventure={adventure} />
        </Fragment>
      );
    }}
  </Query>
);

export default AdventureEdit;

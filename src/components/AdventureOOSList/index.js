import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { Header, Loader } from 'semantic-ui-react';

import { OFFERS_OF_SERVICE_FOR_ADVENTURE } from '../../graphql/queries';
import SortableTable from '../SortableTable';

class AdventureOOSList extends Component {
  render() {
    const { id } = this.props;
    return (
      <Query
        query={OFFERS_OF_SERVICE_FOR_ADVENTURE}
        variables={{ id }}
        fetchPolicy="no-cache"
      >
        {({ data, loading, error }) => {
          if (loading) return <Loader active />;
          if (error) {
            return <p>Error</p>;
          }
          const tableData = data.adventure.OffersOfServiceConnection.edges.map(
            ({ node: { id, oosNumber, email, fullName } }) => ({
              id,
              email,
              fullName,
              oosNumber,
            })
          );
          const columns = [
            {
              key: 'oosNumber',
              text: 'OOS Number',
            },
            {
              key: 'fullName',
              text: 'Name',
            },
            {
              key: 'email',
              text: 'Email Address',
            },
          ];
          return (
            <Fragment>
              <Header as="h2">Offers of Service</Header>
              <SortableTable
                columns={columns}
                data={tableData}
                defaultSortColumn="fullName"
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default AdventureOOSList;

import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { Header, Loader } from 'semantic-ui-react';

import { OFFERS_OF_SERVICE_FOR_ADVENTURE } from '../../graphql/queries';
import AdventureOOSTable from './table';

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
          console.log(data.adventure);
          const tableData = data.adventure.OffersOfServiceConnection
            ? data.adventure.OffersOfServiceConnection.edges.map(
                ({ node: { id, oosNumber, email, fullName, isYouth } }) => ({
                  id,
                  email,
                  fullName,
                  oosNumber,
                  isYouth,
                })
              )
            : [];

          return (
            <Fragment>
              <Header as="h2">Offers of Service</Header>
              <AdventureOOSTable data={tableData} />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default AdventureOOSList;

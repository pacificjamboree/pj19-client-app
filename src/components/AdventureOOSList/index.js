import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { Header, Label, Loader } from 'semantic-ui-react';

import { OFFERS_OF_SERVICE_FOR_ADVENTURE } from '../../graphql/queries';
import AdventureOOSTable from './table';

class AdventureOOSList extends Component {
  render() {
    const { id, oosRequired } = this.props;
    return (
      <Query
        query={OFFERS_OF_SERVICE_FOR_ADVENTURE}
        variables={{ adventureId: id }}
        fetchPolicy="no-cache"
      >
        {({ data, loading, error }) => {
          if (loading) return <Loader active />;
          if (error) {
            return <p>Error</p>;
          }

          const { offersOfServiceForAdventure } = data;

          return (
            <Fragment>
              <Header as="h2">Offers of Service</Header>
              <div>
                <Label>
                  OOS Required
                  <Label.Detail>{oosRequired}</Label.Detail>
                </Label>
                {tableData.length ? (
                  <Label>
                    OOS Assigned
                    <Label.Detail>{tableData.length}</Label.Detail>
                  </Label>
                ) : null}
              </div>
              {offersOfServiceForAdventure.length ? (
                <AdventureOOSTable data={offersOfServiceForAdventure} />
              ) : (
                <p>No Offers of Service are assigned to this adventure.</p>
              )}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default AdventureOOSList;

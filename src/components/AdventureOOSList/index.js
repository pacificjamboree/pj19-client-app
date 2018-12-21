import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { Grid, Header, Label, Loader } from 'semantic-ui-react';

import { OFFERS_OF_SERVICE_FOR_ADVENTURE } from '../../graphql/queries';
import AdventureOOSTable from './table';
import Export from './export';

class AdventureOOSList extends Component {
  render() {
    const { id, oosRequired, adventureName } = this.props;
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
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h2">Offers of Service</Header>
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <Export
                      adventureName={adventureName}
                      data={offersOfServiceForAdventure}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <div>
                <Label>
                  OOS Required
                  <Label.Detail>{oosRequired}</Label.Detail>
                </Label>
                {offersOfServiceForAdventure.length ? (
                  <Label>
                    OOS Assigned
                    <Label.Detail>
                      {offersOfServiceForAdventure.length}
                    </Label.Detail>
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

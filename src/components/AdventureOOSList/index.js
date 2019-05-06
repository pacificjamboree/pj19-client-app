import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Button, Grid, Header, Icon, Label, Loader } from 'semantic-ui-react';

import { OFFERS_OF_SERVICE_FOR_ADVENTURE } from '../../graphql/queries';
import AdventureOOSTable from './table';
import Export from './export';
import CopyEmailAddressesModal from '../CopyEmailAddressesModal';

class AdventureOOSList extends Component {
  render() {
    const { id, oosRequired, adultOOSRequired, adventureName } = this.props;
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
          const adultOOSCount = offersOfServiceForAdventure.filter(
            o => !o.isYouth
          ).length;

          const emailAddresses = [
            ...new Set(
              [].concat(
                ...offersOfServiceForAdventure.map(oos => [
                  oos.email,
                  oos.parentEmail,
                ])
              )
            ),
          ]
            .filter(Boolean)
            .join(', ');

          return (
            <>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h2">Offers of Service</Header>
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <CopyEmailAddressesModal
                      trigger={
                        <Button icon labelPosition="left">
                          <Icon name="copy outline" />
                          Copy Email Addresses
                        </Button>
                      }
                      description="OOS email addresses. Includes parent email addresses."
                      emailAddresses={emailAddresses}
                    />
                    <Export
                      adventureName={adventureName}
                      data={offersOfServiceForAdventure}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <div style={{ marginTop: '1em' }}>
                <Label>
                  OOS Required
                  <Label.Detail>{oosRequired}</Label.Detail>
                </Label>
                <Label>
                  Adult OOS Required
                  <Label.Detail>{adultOOSRequired}</Label.Detail>
                </Label>
                {offersOfServiceForAdventure.length ? (
                  <>
                    <Label>
                      OOS Assigned
                      <Label.Detail>
                        {offersOfServiceForAdventure.length}
                      </Label.Detail>
                    </Label>
                    <Label>
                      Adult OOS Assigned
                      <Label.Detail>{adultOOSCount}</Label.Detail>
                    </Label>
                  </>
                ) : null}
              </div>
              {offersOfServiceForAdventure.length ? (
                <AdventureOOSTable data={offersOfServiceForAdventure} />
              ) : (
                <p style={{ marginTop: '1em' }}>
                  No Offers of Service are assigned to this adventure.
                </p>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default AdventureOOSList;

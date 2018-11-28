import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Loader, Header, Button, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import OOSCard from './card';

import { BATCH_IMPORT_OOS_MUTATION } from '../../graphql/queries';
import {
  OFFERS_OF_SERVICE_FRAGMENT,
  ADVENTURE_NAME_ID_FRAGMENT,
} from '../../graphql/fragments';

const query = gql`
  query getOOSWithAdventureNamesIds {
    offersOfService: offersOfService {
      ...OffersOfServiceFragment
    }
    adventures: adventures {
      ...AdventureNameIdFragment
    }
  }
  ${OFFERS_OF_SERVICE_FRAGMENT}
  ${ADVENTURE_NAME_ID_FRAGMENT}
`;

const refetchQuery = gql`
  query {
    offersOfService: offersOfService {
      ...OffersOfServiceFragment
    }
  }
  ${OFFERS_OF_SERVICE_FRAGMENT}
`;

const noOOS = resetState => (
  <>
    <Header as="h2">No Offers of Service to Import</Header>
    <p>
      The OOS Import file uploaded contains no new Offers of Service to import.
    </p>
    <Button color="teal" onClick={resetState}>
      Upload Another File
    </Button>
  </>
);

class OOSImporter extends Component {
  render() {
    const {
      importData,
      importId,
      changeHandler,
      stepUpdater,
      resetState,
    } = this.props;
    return (
      <Query query={query}>
        {({ data, loading, error }) => {
          if (loading) return <Loader active />;
          if (error) {
            return <p>Error</p>;
          }

          const newOOS = importData.filter(x => {
            return !data.offersOfService
              .map(x => x.oosNumber)
              .includes(x.oosNumber);
          });

          const count = newOOS.filter(x => x.importOOS).length;
          const adventureOptions = [
            {
              key: 'unassigned',
              text: 'Unassigned',
              value: 'unassigned',
            },
            ...data.adventures.map(({ _id, name }) => ({
              key: _id,
              text: name,
              value: _id,
            })),
          ];

          return newOOS.length === 0 ? (
            noOOS(resetState)
          ) : (
            <>
              <Header as="h2">Prepare Offers of Service for Import</Header>
              <p>
                The list below contains Offers of Service from the Registrar's
                report that do not already exist in this system. Review the
                list. If an OOS has been pre-recruited and confirmed, change
                their adventure assignment using the drop-down menu; otherwise,
                leave them as "Unassigned" . If an OOS should <b>not</b> be
                imported, toggle the switch on their record.
              </p>
              {newOOS.map(o => (
                <OOSCard
                  key={o.oosNumber}
                  oos={o}
                  adventures={adventureOptions}
                  changeHandler={changeHandler}
                />
              ))}
              <Mutation
                mutation={BATCH_IMPORT_OOS_MUTATION}
                onCompleted={() => {
                  stepUpdater(3);
                }}
                refetchQueries={[{ query: refetchQuery }]}
              >
                {(mutationFn, { data, error }) => {
                  return (
                    <Button
                      disabled={count === 0}
                      onClick={e => {
                        e.preventDefault();
                        const toImport = newOOS
                          .filter(x => x.importOOS)
                          .map(x => {
                            const { importOOS, ...data } = x;
                            return {
                              ...data,
                              importId,
                              assignedAdventureId:
                                data.assignedAdventureId === 'unassigned'
                                  ? null
                                  : data.assignedAdventureId,
                              isYouth: data.isYouth === 'Y' ? true : false,
                              prerecruited: data.prerecruited === 'Yes',
                              workflowState: 'active',
                            };
                          });
                        mutationFn({
                          variables: {
                            data: toImport,
                          },
                        });
                      }}
                      color="teal"
                      icon
                      labelPosition="left"
                    >
                      <Icon name="check" />
                      {count > 0
                        ? `Import ${count} Offers of Service`
                        : `No Offers of Service Selected for Import`}
                    </Button>
                  );
                }}
              </Mutation>
            </>
          );
        }}
      </Query>
    );
  }
}

export default OOSImporter;

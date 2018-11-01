import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Loader, Header, Button, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import OOSCard from './card';

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

class OOSImporter extends Component {
  render() {
    const { importData, importCount, changeHandler, mutation } = this.props;
    console.log({ importData });
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

          return (
            <>
              <Header as="h2">New Offers of Service</Header>
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
              <Button
                onClick={e => {
                  e.preventDefault();
                  const toImport = importData
                    .filter(x => x.importOOS)
                    .map(x => {
                      const { importOOS, ...data } = x;
                      return {
                        ...data,
                        assignedAdventureId:
                          data.assignedAdventureId === 'unassigned'
                            ? null
                            : data.assignedAdventureId,
                        isYouth: data.isYouth === 'Y' ? true : false,
                        prerecruited: data.prerecruited === 'Yes',
                        workflowState: 'active',
                      };
                    });
                  mutation({
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
                Import {importCount} Offers of Service
              </Button>
            </>
          );
        }}
      </Query>
    );
  }
}

export default OOSImporter;

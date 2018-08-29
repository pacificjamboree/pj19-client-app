import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Header, Loader, Table } from 'semantic-ui-react';
import { OFFERS_OF_SERVICE_FOR_ADVENTURE } from '../../graphql/queries';

const AdventureOOSList = ({ id }) => (
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
      console.log(data);
      const oos = data.adventure.OffersOfServiceConnection.edges;

      return (
        <Fragment>
          <Header as="h2">Offers of Service</Header>
          <Table celled selectable sortable striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>OOS Number</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {oos.map(({ node: { id, oosNumber, fullName, email } }) => (
                <Table.Row key={id}>
                  <Table.Cell>{oosNumber}</Table.Cell>
                  <Table.Cell>{fullName}</Table.Cell>
                  <Table.Cell>{email}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Fragment>
      );
    }}
  </Query>
);

export default AdventureOOSList;

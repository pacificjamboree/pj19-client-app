import React, { Component } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { Button, Icon, Loader, Table } from 'semantic-ui-react';
import gql from 'graphql-tag';
import formatDate from 'date-fns/format';
import Query from '../Query';
import { pushFlashMessage } from '../../lib/flashMessage';

const EXISTING_PATROLS = gql`
  query {
    patrols(filters: { workflowState: active }) {
      id
      _id
      patrolNumber
      groupName
      patrolName
    }
  }
`;

const UPDATE_PATROLS = gql`
  mutation updatePatrols($patrols: [PatrolUpdate]) {
    updatePatrols(input: { Patrols: $patrols }) {
      Patrols {
        id
        patrolNumber
        finalPaymentDate
      }
    }
  }
`;

class PatrolPaymentImporter extends Component {
  render() {
    const { client, importData, stepUpdater } = this.props;
    return (
      <Query query={EXISTING_PATROLS}>
        {({ data }) => {
          const { patrols } = data;
          const patches = importData
            .map(i => {
              const patrol = patrols.find(
                p => i.patrolNumber === p.patrolNumber
              );
              return {
                finalPaymentDate: formatDate(i.finalPaymentDate, 'YYYY-MM-DD'),
                id: patrol && patrol.id,
              };
            })
            .filter(p => p.id);

          return (
            <Mutation
              mutation={UPDATE_PATROLS}
              onError={error => {
                console.log(error);
                pushFlashMessage(client, {
                  kind: 'error',
                  message: 'An error occurred while importing patrol payments',
                  error: error.message,
                });
              }}
              onCompleted={() => {
                stepUpdater(3);
              }}
            >
              {(mutationFn, { data, error, loading }) =>
                loading ? (
                  window.scrollTo(0, 0) || (
                    <Loader active>Updating Patrol Payment Info</Loader>
                  )
                ) : (
                  <>
                    <Table>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Patrol Number</Table.HeaderCell>
                          <Table.HeaderCell>Group Name</Table.HeaderCell>
                          <Table.HeaderCell>Patrol Name</Table.HeaderCell>
                          <Table.HeaderCell>
                            Final Payment Received
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {importData.map(x => {
                          const p = patrols.find(
                            p => p.patrolNumber === x.patrolNumber
                          );
                          const date = formatDate(
                            x.finalPaymentDate,
                            'YYYY-MM-DD'
                          );
                          if (p) {
                            return (
                              <Table.Row key={x.patrolNumber}>
                                <Table.Cell>{x.patrolNumber}</Table.Cell>
                                <Table.Cell>{p.groupName}</Table.Cell>
                                <Table.Cell>{p.patrolName}</Table.Cell>
                                <Table.Cell>{date}</Table.Cell>
                              </Table.Row>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </Table.Body>
                    </Table>
                    <Button
                      color="teal"
                      icon
                      labelPosition="left"
                      style={{ marginTop: '1em' }}
                      onClick={e => {
                        e.preventDefault();
                        const variables = {
                          patrols: patches,
                        };
                        mutationFn({
                          variables,
                        });
                      }}
                    >
                      <Icon name="check" />
                      Continue
                    </Button>
                  </>
                )
              }
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default withApollo(PatrolPaymentImporter);

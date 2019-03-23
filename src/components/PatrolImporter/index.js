import React, { Component } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { Button, Header, Icon, Loader } from 'semantic-ui-react';
import gql from 'graphql-tag';
import pluralize from 'pluralize';
import Query from '../Query';
import PatrolImportTable from '../PatrolImportTable';
import { pushFlashMessage } from '../../lib/flashMessage';
/*
- take the data parsed from the excel file
- get all existing patrols
- four lists: 
  - new patrols (in excel file, not in db
  - deleted patrols (not in excel file, in db)
  - unchanged patrols (in excel file, in db, no changes)
  - changed patrols (in excel file, in db, fields changed)
*/

const EXISTING_PATROLS = gql`
  query {
    patrols(filters: { workflowState: active }) {
      id
      _id
      patrolNumber
      groupName
      patrolName
      numberOfScouts
      numberOfScouters
      totalUnitSize
      patrolScouter {
        id
        _id
        firstName
        lastName
        email
        phone
      }
    }
  }
`;

const IMPORT_PATROLS_MUTATION = gql`
  mutation batchImportPatrolsMutation(
    $importPatrols: [PatrolImportDraft]!
    $deletePatrols: [ID]!
  ) {
    batchPatrols(
      input: { ImportPatrols: $importPatrols, DeletePatrols: $deletePatrols }
    ) {
      ImportedPatrols {
        id
        _id
        patrolNumber
        groupName
        patrolName
        numberOfScouts
        numberOfScouters
        totalUnitSize
        subcamp
        patrolScouter {
          id
          _id
          firstName
          lastName
          email
          phone
        }
      }
      DeletedPatrols {
        id
      }
    }
  }
`;
class PatrolImporter extends Component {
  render() {
    const { client, importData, importId, stepUpdater } = this.props;
    return (
      <Query query={EXISTING_PATROLS}>
        {({ data, loading, error }) => {
          const existingPatrols = data.patrols;
          const existingPatrolNumbers = existingPatrols.map(
            p => p.patrolNumber
          );

          const newPatrols = importData
            .filter(p => !existingPatrolNumbers.includes(p.patrolNumber))
            .map(p => ({
              ...p,
              importPatrol: true,
            }));

          // deleted patrols are ones that appear in the
          // existingPatrols list but not in importedData
          const importPatrolNumbers = importData.map(p => p.patrolNumber);
          const deletedPatrols = existingPatrols
            .filter(p => !importPatrolNumbers.includes(p.patrolNumber))
            .map(p => ({
              ...p,
              deletePatrol: true,
            }));

          // const changedPatrols

          // const unchangedPatrols

          return (
            <Mutation
              mutation={IMPORT_PATROLS_MUTATION}
              onError={error => {
                pushFlashMessage(client, {
                  kind: 'error',
                  message: 'An error occurred while importing patrols',
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
                    <Loader active>Importing Patrols…</Loader>
                  )
                ) : (
                  <TableWrapper
                    newPatrols={newPatrols}
                    deletedPatrols={deletedPatrols}
                    importId={importId}
                    mutationFn={mutationFn}
                  />
                )
              }
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

class TableWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPatrols: props.newPatrols,
      deletedPatrols: props.deletedPatrols,
    };
    this.handleToggleImportPatrol = this.handleToggleImportPatrol.bind(this);
    this.handleToggleDeletePatrol = this.handleToggleDeletePatrol.bind(this);
  }

  handleToggleImportPatrol(patrolNumber) {
    const { newPatrols } = this.state;
    const newState = newPatrols.map(p => {
      if (p.patrolNumber === patrolNumber) {
        p.importPatrol = !p.importPatrol;
      }
      return p;
    });
    this.setState({
      newPatrols: newState,
    });
  }

  handleToggleDeletePatrol(patrolNumber) {
    const { deletedPatrols } = this.state;
    const newState = deletedPatrols.map(p => {
      if (p.patrolNumber === patrolNumber) {
        console.log(`Got patrol number ${patrolNumber}`);
        p.deletePatrol = !p.deletePatrol;
      }
      return p;
    });
    this.setState({
      deletedPatrols: newState,
    });
  }

  render() {
    const { newPatrols, deletedPatrols } = this.state;
    const { importId, mutationFn } = this.props;
    const toImportCount = newPatrols.filter(p => p.importPatrol).length;
    const toDeleteCount = deletedPatrols.filter(p => p.deletePatrol).length;
    return (
      <>
        <Header as="h1">New Patrols</Header>
        <span>
          {toImportCount.toString()} new {pluralize('patrol', toImportCount)} to
          import
        </span>
        <PatrolImportTable
          patrols={newPatrols}
          defaultSortColumn="patrolNumber"
          toggleLabel="Import Patrol"
          toggleFn={this.handleToggleImportPatrol}
          toggleCheckedField="importPatrol"
        />
        <Header as="h1">Deleted Patrols</Header>
        <span>
          {toDeleteCount.toString()} existing{' '}
          {pluralize('patrol', toDeleteCount)}{' '}
          {toDeleteCount.length === 1 ? 'does' : 'do'} not exist in the import
          file and will be deleted
        </span>
        <PatrolImportTable
          patrols={deletedPatrols}
          defaultSortColumn="patrolNumber"
          toggleLabel="Delete Patrol"
          toggleFn={this.handleToggleDeletePatrol}
          toggleCheckedField="deletePatrol"
        />
        <Button
          color="teal"
          icon
          labelPosition="left"
          style={{ marginTop: '1em' }}
          onClick={e => {
            e.preventDefault();
            const variables = {
              importPatrols: newPatrols.map(p => {
                const { importPatrol, ...patrol } = p;
                return { importId, ...patrol };
              }),
              deletePatrols: deletedPatrols.map(p => p.id),
            };
            console.log(variables);
            mutationFn({
              variables,
            });
          }}
        >
          <Icon name="check" />
          Continue
        </Button>
      </>
    );
  }
}

export default withApollo(PatrolImporter);

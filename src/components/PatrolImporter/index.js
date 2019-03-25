import React, { Component } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { Button, Header, Icon, Loader } from 'semantic-ui-react';
import gql from 'graphql-tag';
import pluralize from 'pluralize';
import { DeepDiff } from 'deep-diff';
import Query from '../Query';
import PatrolImportTable from '../PatrolImportTable';
import { pushFlashMessage } from '../../lib/flashMessage';
import DiffCard from './DiffCard';

/*
- take the data parsed from the excel file
- get all existing patrols
- three lists: 
  - new patrols (in excel file, not in db
  - deleted patrols (not in excel file, in db)
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
      subcamp
      patrolScouter {
        id
        _id
        email
      }
    }
  }
`;

const IMPORT_PATROLS_MUTATION = gql`
  mutation batchImportPatrolsMutation(
    $importPatrols: [PatrolImportDraft]!
    $deletePatrols: [ID]!
    $patchPatrols: [PatrolPatch]!
  ) {
    batchPatrols(
      input: {
        ImportPatrols: $importPatrols
        DeletePatrols: $deletePatrols
        PatchPatrols: $patchPatrols
      }
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
          email
        }
      }
      DeletedPatrols {
        id
      }
      PatchedPatrols {
        id
      }
      PatchedScouters {
        id
      }
    }
  }
`;
class PatrolImporter extends Component {
  render() {
    const {
      client,
      importData,
      importId,
      stepUpdater,
      setResults,
    } = this.props;
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

          // changed patrols are ones that appear in the
          // existingPatrols list but have diffs
          // find patrols that exist in both existingPatrols and importData
          const importedPatrolsThatExist = importData.filter(p =>
            existingPatrolNumbers.includes(p.patrolNumber)
          );

          const changedPatrols = importedPatrolsThatExist
            .map(importedPatrol => {
              // find the matching patrol in existingPatrols
              const existingPatrol = existingPatrols.find(
                p => p.patrolNumber === importedPatrol.patrolNumber
              );
              const lhs = {
                patrolNumber: existingPatrol.patrolNumber,
                subcamp: existingPatrol.subcamp,
                patrolName: existingPatrol.patrolName,
                groupName: existingPatrol.groupName,
                numberOfScouts: existingPatrol.numberOfScouts,
                numberOfScouters: existingPatrol.numberOfScouters,
                email: existingPatrol.patrolScouter.email,
              };

              const rhs = {
                patrolNumber: importedPatrol.patrolNumber,
                subcamp: importedPatrol.subcamp,
                patrolName: importedPatrol.patrolName,
                groupName: importedPatrol.groupName,
                numberOfScouts: importedPatrol.numberOfScouts,
                numberOfScouters: importedPatrol.numberOfScouters,
                email: importedPatrol.email,
              };

              const diff = DeepDiff(lhs, rhs);

              return diff
                ? {
                    patrol: { ...existingPatrol, patchPatrol: true },
                    diff,
                  }
                : null;
            })
            .filter(x => x);

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
              onCompleted={data => {
                setResults({
                  created: data.batchPatrols.ImportedPatrols.length,
                  updated: data.batchPatrols.PatchedPatrols.length,
                  deleted: data.batchPatrols.DeletedPatrols.length,
                  scoutersUpdated: data.batchPatrols.PatchedScouters.length,
                });
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
                    changedPatrols={changedPatrols}
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
      changedPatrols: props.changedPatrols,
    };
    this.handleToggleImportPatrol = this.handleToggleImportPatrol.bind(this);
    this.handleToggleDeletePatrol = this.handleToggleDeletePatrol.bind(this);
    this.handleTogglePatchPatrol = this.handleTogglePatchPatrol.bind(this);
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
        p.deletePatrol = !p.deletePatrol;
      }
      return p;
    });
    this.setState({
      deletedPatrols: newState,
    });
  }

  handleTogglePatchPatrol(patrolNumber) {
    const { changedPatrols } = this.state;
    const newState = changedPatrols.map(x => {
      if (x.patrol.patrolNumber === patrolNumber) {
        x.patrol.patchPatrol = !x.patrol.patchPatrol;
      }
      return x;
    });
    this.setState({
      changedPatrols: newState,
    });
  }

  render() {
    const { newPatrols, deletedPatrols, changedPatrols } = this.state;
    const { importId, mutationFn } = this.props;
    const toImportCount = newPatrols.filter(p => p.importPatrol).length;
    const toDeleteCount = deletedPatrols.filter(p => p.deletePatrol).length;
    const toPatchCount = changedPatrols.filter(x => x.patrol.patchPatrol)
      .length;
    return (
      <>
        <Header as="h1">Patrol Import</Header>
        <Header as="h2">New Patrols</Header>
        <p>
          {toImportCount.toString()} new {pluralize('patrol', toImportCount)} to
          import.
        </p>
        <PatrolImportTable
          patrols={newPatrols}
          defaultSortColumn="patrolNumber"
          toggleLabel="Import Patrol"
          toggleFn={this.handleToggleImportPatrol}
          toggleCheckedField="importPatrol"
        />
        <Header as="h2">Deleted Patrols</Header>
        <p>
          {toDeleteCount.toString()} existing{' '}
          {pluralize('patrol', toDeleteCount)}{' '}
          {toDeleteCount.length === 1 ? 'does' : 'do'} not exist in the import
          file and will be deleted.
        </p>
        <PatrolImportTable
          patrols={deletedPatrols}
          defaultSortColumn="patrolNumber"
          toggleLabel="Delete Patrol"
          toggleFn={this.handleToggleDeletePatrol}
          toggleCheckedField="deletePatrol"
        />
        <Header as="h2">Changed Patrols</Header>
        <p>
          {toPatchCount.toString()} existing {pluralize('patrol', toPatchCount)}{' '}
          {pluralize('has', toPatchCount)} changed and{' '}
          {toPatchCount === 1 ? 'requires' : 'require'} updating.
        </p>
        {changedPatrols.map(p => (
          <DiffCard
            key={p.patrol.id}
            patrol={p.patrol}
            diff={p.diff}
            toggleFn={this.handleTogglePatchPatrol}
          />
        ))}
        <Button
          color="teal"
          icon
          labelPosition="left"
          style={{ marginTop: '1em' }}
          onClick={e => {
            e.preventDefault();
            const variables = {
              importPatrols: newPatrols
                .filter(p => p.importPatrol)
                .map(p => {
                  const { importPatrol, ...patrol } = p;
                  return { importId, ...patrol };
                }),
              deletePatrols: deletedPatrols
                .filter(p => p.deletePatrol)
                .map(p => p.id),
              patchPatrols: changedPatrols
                .filter(p => p.patrol.patchPatrol)
                .map(({ patrol, diff }) => {
                  const patch = {
                    id: patrol.id,
                    patrolScouterId: patrol.patrolScouter.id,
                  };
                  diff.forEach(d => (patch[d.path[0]] = d.rhs));
                  return patch;
                }),
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
    );
  }
}

export default withApollo(PatrolImporter);

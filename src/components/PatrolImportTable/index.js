import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Table } from 'semantic-ui-react';
import sortBy from 'lodash.sortby';
import handleSort from '../../lib/handleSort';
import styles from './styles.module.css';

class PatrolImportTable extends Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
  }

  static propTypes = {
    patrols: PropTypes.array.isRequired,
    defaultSortColumn: PropTypes.string,
  };

  state = {
    sort: {
      column: this.props.defaultSortColumn || null,
      direction: this.props.defaultSortColumn ? 'ascending' : null,
    },
    data: this.props.defaultSortColumn
      ? sortBy(this.props.patrols, [this.props.defaultSortColumn])
      : this.props.patrols,
  };

  handleSort = clickedColumn => () => {
    this.setState(handleSort(clickedColumn));
  };

  render() {
    const { data } = this.state;
    const { column, direction } = this.state.sort;
    const { toggleFn, toggleCheckedField } = this.props;
    return (
      <>
        <div className={styles.tableContainer}>
          <Table celled selectable sortable striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{this.props.toggleLabel}</Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'patrolNumber' ? direction : null}
                  onClick={this.handleSort('patrolNumber')}
                >
                  Patrol Number
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'subcamp' ? direction : null}
                  onClick={this.handleSort('subcamp')}
                >
                  Subcamp
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'groupName' ? direction : null}
                  onClick={this.handleSort('groupName')}
                >
                  Group Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'patrolName' ? direction : null}
                  onClick={this.handleSort('patrolName')}
                >
                  Patrol Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'numberOfScouts' ? direction : null}
                  onClick={this.handleSort('numberOfScouts')}
                >
                  Scouts
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'numberOfScouters' ? direction : null}
                  onClick={this.handleSort('numberOfScouters')}
                >
                  Scouters
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'total' ? direction : null}
                  onClick={this.handleSort('total')}
                >
                  Total
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'email' ? direction : null}
                  onClick={this.handleSort('email')}
                >
                  Contact Scouter Email
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(d => (
                <Table.Row
                  key={d.patrolNumber}
                  className={!d[toggleCheckedField] ? styles.disabled : ''}
                >
                  <Table.Cell textAlign="center">
                    <Checkbox
                      toggle
                      checked={d[toggleCheckedField]}
                      onChange={e => {
                        toggleFn(d.patrolNumber);
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell>{d.patrolNumber}</Table.Cell>
                  <Table.Cell>{d.subcamp}</Table.Cell>
                  <Table.Cell>{d.groupName}</Table.Cell>
                  <Table.Cell>{d.patrolName}</Table.Cell>
                  <Table.Cell>{d.numberOfScouts}</Table.Cell>
                  <Table.Cell>{d.numberOfScouters}</Table.Cell>
                  <Table.Cell>
                    {d.numberOfScouts + d.numberOfScouters}
                  </Table.Cell>
                  <Table.Cell>{d.email}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </>
    );
  }
}

export default PatrolImportTable;

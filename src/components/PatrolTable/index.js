import React, { Component } from 'react';
import { Form, Input, Select, Table } from 'semantic-ui-react';
import sortBy from 'lodash.sortby';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import matchSorter from 'match-sorter';
import debounce from 'lodash.debounce';
import pluralize from 'pluralize';

import handleSort from '../../lib/handleSort';
import styles from './styles.module.css';

class PatrolTable extends Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.filterData = debounce(this.filterData.bind(this), 300);
  }

  static propTypes = {
    patrols: PropTypes.array.isRequired,
    defaultSortColumn: PropTypes.string.isRequired,
  };

  state = {
    filters: {
      textFilter: '',
      subcampFilter: 'all',
      paidFilter: 'all',
      adventureSelectionStatusFilter: 'all',
    },
    sort: {
      column: this.props.defaultSortColumn || null,
      direction: 'ascending',
    },
    data: this.props.defaultSortColumn
      ? sortBy(this.props.patrols, [this.props.defaultSortColumn])
      : this.props.patrols,
  };

  handleSort = clickedColumn => () => {
    this.setState(handleSort(clickedColumn));
  };

  handleFilter(e, data) {
    const { name, value } = data ? data : e.target;

    this.setState(
      {
        filters: {
          ...this.state.filters,
          [name]: value,
        },
      },
      () => {
        this.filterData();
      }
    );
  }

  filterData() {
    const {
      textFilter,
      subcampFilter,
      paidFilter,
      adventureSelectionStatusFilter,
    } = this.state.filters;
    let data = [...this.props.patrols];

    if (textFilter) {
      data = matchSorter(data, textFilter, {
        keys: [
          'patrolNumber',
          'groupName',
          'patrolName',
          'patrolScouter.email',
        ],
        threshold: matchSorter.rankings.CONTAINS,
      });
    }

    switch (subcampFilter) {
      case 'all':
        break;

      default:
        data = data.filter(p => p.subcamp === subcampFilter);
        break;
    }

    switch (paidFilter) {
      case 'all':
        break;
      default:
        data = data.filter(p => p.fullyPaid === paidFilter);
    }

    switch (adventureSelectionStatusFilter) {
      case 'all':
        break;
      default:
        data = data.filter(
          p =>
            p.adventureSelection.workflowState ===
            adventureSelectionStatusFilter
        );
    }

    this.setState({
      data: sortBy(data, this.state.sort.column),
    });
  }

  render() {
    const { data } = this.state;
    const { column, direction } = this.state.sort;
    return (
      <>
        <div>
          <Input action type="text" placeholder="Filter Patrols">
            <input name="textFilter" onChange={this.handleFilter} />
            <Form.Field
              style={{ borderRadius: '0' }}
              control={Select}
              name="subcampFilter"
              id="subcampFilter"
              options={[
                { value: 'all', text: 'All Subcamps' },
                { value: 'O', text: 'Olympus' },
                { value: 'S', text: 'Saga' },
                { value: 'V', text: 'Valley of the Kings' },
              ]}
              onChange={this.handleFilter}
              value={this.state.filters.subcampFilter}
            />{' '}
            <Form.Field
              style={{ borderRadius: '0' }}
              control={Select}
              name="paidFilter"
              id="paidFilter"
              options={[
                { value: 'all', text: 'All Payment States' },
                { value: true, text: 'Fully Paid' },
                { value: false, text: 'Not Fully Paid' },
              ]}
              onChange={this.handleFilter}
              value={this.state.filters.paidFilter}
            />
            <Form.Field
              style={{ borderRadius: '0' }}
              control={Select}
              name="adventureSelectionStatusFilter"
              id="adventureSelectionStatusFilter"
              options={[
                { value: 'all', text: 'All Adventure Selection States' },
                { value: 'defined', text: 'Not Started' },
                { value: 'draft', text: 'Draft' },
                { value: 'saved', text: 'Saved' },
                { value: 'locked', text: 'Locked' },
              ]}
              onChange={this.handleFilter}
              value={this.state.filters.adventureSelectionStatusFilter}
            />
          </Input>
        </div>
        <div className={styles.tableContainer}>
          <p style={{ size: '1.5em', fontWeight: 'bold' }}>
            {data.length} {pluralize('result', data.length)} found
          </p>
          <Table celled selectable sortable striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={column === 'patrolNumber' ? direction : null}
                  onClick={this.handleSort('patrolNumber')}
                >
                  Patrol Number
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
                  sorted={column === 'subcamp' ? direction : null}
                  onClick={this.handleSort('subcamp')}
                >
                  Subcamp
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
                  sorted={column === 'totalUnitSize' ? direction : null}
                  onClick={this.handleSort('totalUnitSize')}
                >
                  Total
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'patrolScouter.email' ? direction : null}
                  onClick={this.handleSort('patrolScouter.email')}
                >
                  Contact Email
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    column === 'adventureSelection.workflowState'
                      ? direction
                      : null
                  }
                  onClick={this.handleSort('adventureSelection.workflowState')}
                >
                  Adventure Selection
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.map(p => (
                <Table.Row key={p.id}>
                  <Table.Cell>
                    <Link to={`/dashboard/patrols/${p.patrolNumber}`}>
                      {p.patrolNumber}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{p.groupName}</Table.Cell>
                  <Table.Cell>{p.patrolName}</Table.Cell>
                  <Table.Cell>{p.subcamp}</Table.Cell>
                  <Table.Cell>{p.numberOfScouts}</Table.Cell>
                  <Table.Cell>{p.numberOfScouters}</Table.Cell>
                  <Table.Cell>{p.totalUnitSize}</Table.Cell>
                  <Table.Cell>{p.patrolScouter.email}</Table.Cell>
                  <Table.Cell>{p.adventureSelection.workflowState}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </>
    );
  }
}

export default PatrolTable;

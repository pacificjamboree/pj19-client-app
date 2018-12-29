import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Icon, Table } from 'semantic-ui-react';
import sortBy from 'lodash.sortby';

import handleSort from '../../lib/handleSort';

const DurationLabel = duration => {
  switch (duration) {
    case 1:
      return 'Half-Day';
    case 2:
      return 'Full-Day';
    case 3:
      return 'Overnight';
    default:
      return '';
  }
};

class AdventureTable extends Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
  }

  static propTypes = {
    adventures: PropTypes.array.isRequired,
    defaultSortColumn: PropTypes.string,
  };

  handleSort = clickedColumn => () => {
    this.setState(handleSort(clickedColumn));
  };

  state = {
    data: this.props.defaultSortColumn
      ? sortBy(this.props.adventures, [this.props.defaultSortColumn])
      : this.props.adventures,

    sort: {
      column: 'name',
      direction: 'ascending',
    },
  };

  handleSort() {}

  render() {
    const { column, direction } = this.state.sort;
    const { data } = this.state;
    return (
      <Table celled selectable sortable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'adventureCode' ? direction : null}
              onClick={this.handleSort('adventureCode')}
            >
              Code
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'name' ? direction : null}
              onClick={this.handleSort('name')}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'themeName' ? direction : null}
              onClick={this.handleSort('themeName')}
            >
              Theme Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'location' ? direction : null}
              onClick={this.handleSort('location')}
            >
              Location
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'periodsRequired' ? direction : null}
              onClick={this.handleSort('periodsRequired')}
            >
              Duration
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'capacityPerPeriod' ? direction : null}
              onClick={this.handleSort('capacityPerPeriod')}
            >
              Capacity
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'oosRequired' ? direction : null}
              onClick={this.handleSort('oosRequired')}
            >
              OOS Required
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'oosAssignedCount' ? direction : null}
              onClick={this.handleSort('oosAssignedCount')}
            >
              OOS Assigned
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'hidden' ? direction : null}
              onClick={this.handleSort('hidden')}
            >
              Available
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'fee' ? direction : null}
              onClick={this.handleSort('fee')}
            >
              Fee
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(a => (
            <Table.Row key={a.id}>
              <Table.Cell>
                <Link to={a.id}>{a.adventureCode}</Link>
              </Table.Cell>
              <Table.Cell>{a.name}</Table.Cell>
              <Table.Cell>{a.themeName}</Table.Cell>
              <Table.Cell>{a.location}</Table.Cell>
              <Table.Cell>{DurationLabel(a.periodsRequired)}</Table.Cell>
              <Table.Cell>{a.capacityPerPeriod}</Table.Cell>
              <Table.Cell>{a.oosRequired}</Table.Cell>
              <Table.Cell>{a.oosAssignedCount}</Table.Cell>
              <Table.Cell>
                <Icon name={a.hidden ? 'x' : 'check'} />
              </Table.Cell>
              <Table.Cell>${a.fee}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default AdventureTable;

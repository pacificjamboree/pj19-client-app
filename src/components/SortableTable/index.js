import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import sortBy from 'lodash.sortby';
import PropTypes from 'prop-types';

class SortableTable extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    defaultSortColumn: PropTypes.string,
  };
  state = {
    column: this.props.defaultSortColumn || null,
    data: this.props.defaultSortColumn
      ? sortBy(this.props.data, [this.props.defaultSortColumn])
      : this.props.data,
    direction: this.props.defaultSortColumn ? 'ascending' : null,
  };

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: sortBy(data, [clickedColumn]),
        direction: 'ascending',
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  render() {
    const { column, data, direction } = this.state;
    return (
      <Table celled selectable sortable striped>
        <Table.Header>
          <Table.Row>
            {this.props.columns.map(({ key, text }) => (
              <Table.HeaderCell
                key={key}
                sorted={column === key ? direction : null}
                onClick={this.handleSort(key)}
              >
                {text}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map(({ id, oosNumber, fullName, email }) => (
            <Table.Row key={id}>
              <Table.Cell>{oosNumber}</Table.Cell>
              <Table.Cell>{fullName}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default SortableTable;

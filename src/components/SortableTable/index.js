import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import sortBy from 'lodash.sortby';
import PropTypes from 'prop-types';

class SortableTable extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    defaultSortColumn: PropTypes.string,
    rowKeyField: PropTypes.string.isRequired,
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
          {data.map(d => (
            <Table.Row key={d[this.props.rowKeyField]}>
              {this.props.columns.map(({ key }) => (
                <Table.Cell>{d[key]}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default SortableTable;

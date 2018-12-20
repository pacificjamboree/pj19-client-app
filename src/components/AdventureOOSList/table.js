import React, { Component } from 'react';
import { Table, Icon, Label } from 'semantic-ui-react';
import sortBy from 'lodash.sortby';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

import handleSort from '../../lib/handleSort';

class AdventureOOSTable extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    defaultSortColumn: PropTypes.string,
  };

  state = {
    sort: {
      column: this.props.defaultSortColumn || null,
      direction: this.props.defaultSortColumn ? 'ascending' : null,
    },
    data: this.props.defaultSortColumn
      ? sortBy(this.props.data, [this.props.defaultSortColumn])
      : this.props.data,
  };

  handleSort = clickedColumn => () => {
    this.setState(handleSort(clickedColumn));
  };

  render() {
    const { column, data, direction } = this.state;

    return (
      <Table celled selectable sortable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'oosNumber' ? direction : null}
              onClick={this.handleSort('oosNumber')}
            >
              OOS Number
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === 'fullName' ? direction : null}
              onClick={this.handleSort('fullName')}
            >
              Last Name
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === 'email' ? direction : null}
              onClick={this.handleSort('email')}
            >
              Email Address
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === 'isYouth' ? direction : null}
              onClick={this.handleSort('isYouth')}
            >
              Is Youth?
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map(oos => {
            return (
              <Table.Row key={oos.id}>
                <Table.Cell>
                  <Link to={`../../oos/${oos.oosNumber}`}>
                    <Icon name="address card" /> {oos.oosNumber}
                  </Link>
                </Table.Cell>
                <Table.Cell>{oos.fullName}</Table.Cell>
                <Table.Cell>{oos.email}</Table.Cell>
                <Table.Cell>
                  {oos.isYouth ? (
                    <Label color="red" horizontal>
                      <Icon name="exclamation triangle" />
                      Yes
                    </Label>
                  ) : (
                    'No'
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}

export default AdventureOOSTable;

import React, { Component } from 'react';
import {
  Dropdown,
  Form,
  Icon,
  Input,
  Label,
  Popup,
  Select,
  Table,
} from 'semantic-ui-react';
import sortBy from 'lodash.sortby';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import matchSorter from 'match-sorter';
import SendWelcomeEmail from '../../components/SendWelcomeEmail';
import SendAssignmentEmail from '../../components/SendAssignmentEmail';
import handleSort from '../../lib/handleSort';

const SendEmailMenu = ({ oos, ...rest }) => (
  <Dropdown {...rest} inline icon="envelope outline">
    <Dropdown.Menu>
      <SendWelcomeEmail id={oos.id}>
        <Dropdown.Item>Send Welcome Message</Dropdown.Item>
      </SendWelcomeEmail>
      <SendAssignmentEmail id={oos.id} assigned={oos.assigned}>
        <Dropdown.Item disabled={!oos.assigned}>
          Send Assignment Message
        </Dropdown.Item>
      </SendAssignmentEmail>
    </Dropdown.Menu>
  </Dropdown>
);

class OOSList extends Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  static propTypes = {
    offersOfService: PropTypes.array.isRequired,
    adventures: PropTypes.array.isRequired,
    defaultSortColumn: PropTypes.string,
  };

  state = {
    filters: {
      textFilter: '',
      adventureFilter: 'all',
      isYouthFilter: 'all',
    },
    sort: {
      column: this.props.defaultSortColumn || null,
      direction: this.props.defaultSortColumn ? 'ascending' : null,
    },
    data: this.props.defaultSortColumn
      ? sortBy(this.props.offersOfService, [this.props.defaultSortColumn])
      : this.props.offersOfService,
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
    const { textFilter, adventureFilter, isYouthFilter } = this.state.filters;
    let data = [...this.props.offersOfService];

    if (textFilter) {
      data = matchSorter(data, textFilter, {
        keys: ['fullName', 'oosNumber', 'email'],
      });
    }

    switch (adventureFilter) {
      case 'all':
        break;

      case 'unassigned':
        data = data.filter(a => !a.assigned);
        break;

      default:
        data = data.filter(a => a.assignment._id === adventureFilter);
        break;
    }

    switch (isYouthFilter) {
      case 'youth':
        data = data.filter(a => a.isYouth);
        break;

      case 'adult':
        data = data.filter(a => !a.isYouth);
        break;

      default:
        break;
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
          <Input action type="text" placeholder="Filter">
            <input name="textFilter" onChange={this.handleFilter} />
            <Form.Field
              style={{ borderRadius: '0' }}
              control={Select}
              name="adventureFilter"
              id="adventureFilter"
              options={[
                { value: 'all', text: 'All Adventures' },
                { value: 'unassigned', text: 'Unassigned' },
                ...this.props.adventures.map(a => ({
                  value: a._id,
                  text: a.name,
                })),
              ]}
              onChange={this.handleFilter}
              value={this.state.filters.adventureFilter}
            />
            <Form.Field
              style={{ borderRadius: '0' }}
              control={Select}
              name="isYouthFilter"
              id="isYouthFilter"
              options={[
                { value: 'all', text: 'All Ages' },
                { value: 'youth', text: 'Youth Members Only' },
                { value: 'adult', text: 'Adult Members Only' },
              ]}
              onChange={this.handleFilter}
              value={this.state.filters.isYouthFilter}
            />
          </Input>
        </div>

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
                sorted={column === 'lastName' ? direction : null}
                onClick={this.handleSort('lastName')}
              >
                Last Name
              </Table.HeaderCell>

              <Table.HeaderCell
                sorted={column === 'firstName' ? direction : null}
                onClick={this.handleSort('firstName')}
              >
                First Name
              </Table.HeaderCell>

              <Table.HeaderCell
                sorted={column === 'email' ? direction : null}
                onClick={this.handleSort('email')}
              >
                Email Address
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'assignment' ? direction : null}
                onClick={this.handleSort('assignment')}
              >
                Assignment
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'isYouth' ? direction : null}
                onClick={this.handleSort('isYouth')}
              >
                Is Youth?
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'prerecruited' ? direction : null}
                onClick={this.handleSort('prerecruited')}
              >
                Pre-Recruited?
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map(oos => {
              return (
                <Table.Row key={oos.id}>
                  <Table.Cell>
                    <Link to={`${oos.oosNumber}`}>
                      <Icon name="address card" /> {oos.oosNumber}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{oos.lastName}</Table.Cell>
                  <Table.Cell>{oos.preferredName || oos.firstName}</Table.Cell>
                  <Table.Cell>
                    <Popup
                      inverted
                      position="left center"
                      content="Send Emails to OOS"
                      trigger={<SendEmailMenu oos={oos} />}
                    />
                    {oos.email}
                  </Table.Cell>
                  <Table.Cell>
                    {oos.isAdventureManager ? (
                      <Icon name="star" color="yellow" />
                    ) : null}
                    {oos.assigned ? (
                      oos.assignment.name
                    ) : (
                      <Label color="orange" horizontal>
                        Unassigned
                      </Label>
                    )}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {oos.isYouth ? (
                      <Label color="red" horizontal>
                        <Icon name="exclamation triangle" />
                        Yes
                      </Label>
                    ) : (
                      'No'
                    )}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Icon name={oos.prerecruited ? 'check' : 'x'} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </>
    );
  }
}

export default OOSList;

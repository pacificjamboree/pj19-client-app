import React, { Component } from 'react';
import { Table, Label, Icon, Checkbox, Button } from 'semantic-ui-react';
import sortBy from 'lodash.sortby';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Mutation } from 'react-apollo';
import handleSort from '../../lib/handleSort';
import { SEND_OOS_WELCOME_EMAILS_BULK } from '../../graphql/queries';

export default class extends Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
    this.handleEmailToggle = this.handleEmailToggle.bind(this);
  }
  static propTypes = {
    data: PropTypes.array.isRequired,
    defaultSortColumn: PropTypes.string,
  };

  state = {
    column: this.props.defaultSortColumn || null,
    data: this.props.defaultSortColumn
      ? sortBy(this.props.data, [this.props.defaultSortColumn])
      : this.props.data,
    direction: this.props.defaultSortColumn ? 'ascending' : null,
    pendingWelcomeMessages: this.props.data.map(x => x.id),
  };

  handleSort = clickedColumn => () => {
    this.setState(handleSort(clickedColumn));
  };

  handleEmailToggle = id => {
    let newArr;
    if (this.state.pendingWelcomeMessages.includes(id)) {
      newArr = this.state.pendingWelcomeMessages.filter(x => x !== id);
    } else {
      newArr = [...this.state.pendingWelcomeMessages, id];
    }
    this.setState({ pendingWelcomeMessages: newArr });
  };

  render() {
    const { column, data, direction } = this.state;
    const { stepUpdater } = this.props;
    console.log(this.props);
    return (
      <>
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
                sorted={column === 'isYouth' ? direction : null}
                onClick={this.handleSort('isYouth')}
              >
                Is Youth?
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'assignment' ? direction : null}
                onClick={this.handleSort('assignment')}
              >
                Assignment
              </Table.HeaderCell>
              <Table.HeaderCell>Send Welcome Message?</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map(oos => {
              return (
                <Table.Row key={oos.id}>
                  <Table.Cell>
                    <Link to={`/oos/${oos.oosNumber}`}>
                      <Icon name="address card" /> {oos.oosNumber}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{oos.lastName}</Table.Cell>
                  <Table.Cell>{oos.firstName}</Table.Cell>
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
                  <Table.Cell>
                    {oos.assigned ? (
                      oos.assignment.name
                    ) : (
                      <Label color="orange" horizontal>
                        Unassigned
                      </Label>
                    )}
                  </Table.Cell>
                  <Table.Cell
                    textAlign="center"
                    onClick={() => {
                      this.handleEmailToggle(oos.id);
                    }}
                  >
                    <Checkbox
                      toggle
                      checked={this.state.pendingWelcomeMessages.includes(
                        oos.id
                      )}
                      onClick={() => {
                        this.handleEmailToggle(oos.id);
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>

        <Mutation
          mutation={SEND_OOS_WELCOME_EMAILS_BULK}
          onCompleted={() => {
            stepUpdater(4);
          }}
        >
          {(mutationFn, { data, error }) => {
            return (
              <Button
                icon
                color="teal"
                labelPosition="left"
                onClick={e => {
                  e.preventDefault();
                  mutationFn({
                    variables: {
                      ids: this.state.pendingWelcomeMessages,
                    },
                  });
                }}
              >
                <Icon name="mail" />
                Send Welcome Messages
              </Button>
            );
          }}
        </Mutation>
      </>
    );
  }
}
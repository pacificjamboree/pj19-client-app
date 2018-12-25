import React, { Component } from 'react';
import { Form, Header, Button, Icon } from 'semantic-ui-react';
import { utoa } from '../../lib/base64';
import UserHasRole from '../UserHasRole';
import styles from './AdventureCreateForm.module.css';

class AdventureCreateForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMultiVariant = this.handleChangeMultiVariant.bind(this);
    this.handleAddMultiVariant = this.handleAddMultiVariant.bind(this);
  }

  state = {
    adventureCode: '',
    name: '',
    themeName: '',
    description: '',
    location: 'onsite',
    capacityPerPeriod: 0,
    periodsOffered: 11,
    periodsRequired: 1,
    premiumAdventure: false,
    oosRequired: 0,
    fee: 0,
    hidden: false,
    pdrPlan: [],
    pdrDo: [],
    pdrReview: [],
    pdrSafetyTips: [],
    workflowState: 'active',
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleChangeMultiVariant = (e, { id, value, name }) => {
    const newState = [...this.state[name]];
    newState.forEach(i => {
      if (i.id === id) {
        i.text = value;
      }
    });
    this.setState({
      [name]: newState,
    });
  };

  handleRemoveMultiVariant = (type, id, e) => {
    e.preventDefault();
    this.setState({
      [type]: this.state[type].filter(x => x.id !== id),
    });
  };

  handleAddMultiVariant = (type, e) => {
    e.preventDefault();
    const id = utoa(`${type}-${Date.now()}`);
    const newState = [
      ...this.state[type],
      {
        text: '',
        id,
      },
    ];
    this.setState({ [type]: newState }, () => {
      document.getElementById(id).focus();
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const payload = { ...this.state };
    ['pdrPlan', 'pdrDo', 'pdrReview', 'pdrSafetyTips'].forEach(
      x => (payload[x] = payload[x].map(y => y.text).filter(y => y !== ''))
    );
    try {
      await this.props.mutate({
        variables: {
          adventure: payload,
        },
      });
    } catch (e) {
      throw e;
    }
  };

  render() {
    const locationOptions = [
      {
        text: 'Half Day',
        value: 1,
      },
      {
        text: 'Full Day',
        value: 2,
      },
      {
        text: 'Overnight',
        value: 3,
      },
    ];

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          name="themeName"
          id="themeName"
          label="Theme Name"
          value={this.state.themeName}
          fluid
          onChange={this.handleChange}
        />
        <Form.Input
          name="name"
          id="name"
          label="Adventure Name"
          value={this.state.name}
          fluid
          onChange={this.handleChange}
        />
        <Form.Input
          name="adventureCode"
          id="adventureCode"
          label="Adventure Code"
          value={this.state.adventureCode}
          fluid
          onChange={this.handleChange}
        />
        <Form.TextArea
          name="description"
          id="description"
          label="Description"
          value={this.state.description}
          onChange={this.handleChange}
        />

        <UserHasRole userRoles={['admin']}>
          <Form.Group inline>
            <label>Location</label>
            <Form.Radio
              name="location"
              label="On-Site"
              value="onsite"
              checked={this.state.location === 'onsite'}
              onChange={this.handleChange}
            />
            <Form.Radio
              name="location"
              label="Off-Site"
              value="offsite"
              checked={this.state.location === 'offsite'}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Dropdown
              label="Duration"
              name="periodsRequired"
              id="periodsRequired"
              defaultValue={this.state.periodsRequired}
              options={locationOptions}
              onChange={this.handleChange}
              fluid
              selection
              style={{ lineHeight: 'unset' }}
            />
            <Form.Input
              name="periodsOffered"
              id="periodsOffered"
              fluid
              label="Periods Offered"
              type="number"
              value={this.state.periodsOffered}
              onChange={(e, { name, value }) => {
                this.handleChange(e, { name, value: parseInt(value) });
              }}
            />

            <Form.Input
              name="capacityPerPeriod"
              id="capacityPerPeriod"
              fluid
              label="Capacity per Period"
              type="number"
              value={this.state.capacityPerPeriod}
              onChange={(e, { name, value }) => {
                this.handleChange(e, { name, value: parseInt(value) });
              }}
            />

            <Form.Input
              name="fee"
              id="fee"
              fluid
              label="Fee"
              type="number"
              value={this.state.fee}
              onChange={(e, { name, value }) => {
                this.handleChange(e, { name, value: parseFloat(value) });
              }}
              icon="dollar"
              iconPosition="left"
            />
          </Form.Group>
        </UserHasRole>

        <Form.Group>
          <Form.Input
            name="oosRequired"
            id="oosRequired"
            fluid
            label="OOS Required"
            type="number"
            value={this.state.oosRequired}
            onChange={(e, { name, value }) => {
              this.handleChange(e, { name, value: parseInt(value) });
            }}
          />
        </Form.Group>

        <Header as="h2">Plan, Do, Review</Header>

        <div className={styles.pdrBlock}>
          <Header as="h3">Plan</Header>
          {this.state.pdrPlan.map(x => (
            <Form.Input
              fluid
              key={x.id}
              name="pdrPlan"
              id={x.id}
              value={x.text}
              onChange={this.handleChangeMultiVariant}
              action={{
                color: 'red',
                icon: 'trash alternate',
                onClick: e => this.handleRemoveMultiVariant('pdrPlan', x.id, e),
              }}
            />
          ))}
          <Button
            type="pdrPlan"
            onClick={e => this.handleAddMultiVariant('pdrPlan', e)}
            size="tiny"
          >
            Add "Plan" Item
          </Button>
        </div>

        <div className={styles.pdrBlock}>
          <Header as="h3">Do</Header>
          {this.state.pdrDo.map(x => (
            <Form.Input
              key={x.id}
              name="pdrDo"
              id={x.id}
              value={x.text}
              onChange={this.handleChangeMultiVariant}
              action={{
                color: 'red',
                icon: 'trash alternate',
                onClick: e => this.handleRemoveMultiVariant('pdrDo', x.id, e),
              }}
            />
          ))}
          <Button
            type="pdrDo"
            onClick={e => this.handleAddMultiVariant('pdrDo', e)}
            size="tiny"
          >
            Add "Do" Item
          </Button>
        </div>

        <div className={styles.pdrBlock}>
          <Header as="h3">Review</Header>
          {this.state.pdrReview.map(x => (
            <Form.Input
              key={x.id}
              name="pdrReview"
              id={x.id}
              value={x.text}
              onChange={this.handleChangeMultiVariant}
              action={{
                color: 'red',
                icon: 'trash alternate',
                onClick: e =>
                  this.handleRemoveMultiVariant('pdrReview', x.id, e),
              }}
            />
          ))}
          <Button
            type="pdrReview"
            onClick={e => this.handleAddMultiVariant('pdrReview', e)}
            size="tiny"
          >
            Add "Review" Item
          </Button>
        </div>

        <div className={styles.pdrBlock}>
          <Header as="h3">Safety Tips</Header>
          {this.state.pdrSafetyTips.map(x => (
            <Form.Input
              key={x.id}
              name="pdrSafetyTips"
              id={x.id}
              value={x.text}
              onChange={this.handleChangeMultiVariant}
              action={{
                color: 'red',
                icon: 'trash alternate',
                onClick: e =>
                  this.handleRemoveMultiVariant('pdrSafetyTips', x.id, e),
              }}
            />
          ))}
          <Button
            type="pdrSafetyTips"
            onClick={e => this.handleAddMultiVariant('pdrSafetyTips', e)}
            size="tiny"
          >
            Add "Safety Tip" Item
          </Button>
        </div>
        <Button
          style={{ marginTop: '1.5em' }}
          onClick={this.handleSubmit}
          color="teal"
          icon
          labelPosition="left"
        >
          <Icon name="check" />
          Save
        </Button>
      </Form>
    );
  }
}

export default AdventureCreateForm;

import React, { Component } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
import './AdventureEditForm.css';

class AdventureEditForm extends Component {
  constructor(props) {
    super(props);
    const { adventure } = props;
    this.state = {
      adventureCode: adventure.adventureCode,
      name: adventure.name,
      themeName: adventure.themeName,
      description: adventure.description,
      location: adventure.location,
      capacityPerPeriod: adventure.capacityPerPeriod,
      periodsOffered: adventure.periodsOffered,
      periodsRequired: adventure.periodsRequired,
      premiumAdventure: adventure.premiumAdventure,
      fee: adventure.fee,
      hidden: adventure.hidden,
      pdrPlan: adventure.pdrPlan.map(p => ({ text: p, id: btoa(p) })),
      pdrDo: adventure.pdrDo.map(p => ({ text: p, id: btoa(p) })),
      pdrReview: adventure.pdrReview.map(p => ({ text: p, id: btoa(p) })),
      pdrSafetyTips: adventure.pdrSafetyTips.map(p => ({
        text: p,
        id: btoa(p),
      })),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMultiVariant = this.handleChangeMultiVariant.bind(this);
    this.handleAddMultiVariant = this.handleAddMultiVariant.bind(this);
  }

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
    const newState = [
      ...this.state[type],
      {
        text: '',
        id: btoa(`${type}-${Date.now()}`),
      },
    ];
    this.setState({ [type]: newState });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const payload = { ...this.state };
    delete payload.id;
    ['pdrPlan', 'pdrDo', 'pdrReview', 'pdrSafetyTips'].forEach(
      x => (payload[x] = payload[x].map(y => y.text).filter(y => y !== ''))
    );
    await this.props.mutate({
      variables: {
        id: this.props.adventure.id,
        adventure: payload,
      },
    });
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
        <Form.TextArea
          name="description"
          id="description"
          label="Description"
          value={this.state.description}
          onChange={this.handleChange}
        />

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
            onChange={this.handleChange}
          />

          <Form.Input
            name="capacityPerPeriod"
            id="capacityPerPeriod"
            fluid
            label="Capacity per Period"
            type="number"
            value={this.state.capacityPerPeriod}
            onChange={this.handleChange}
          />

          <Form.Input
            name="fee"
            id="fee"
            fluid
            label="Fee"
            type="number"
            value={this.state.fee}
            onChange={this.handleChange}
            icon="dollar"
            iconPosition="left"
          />
        </Form.Group>

        <Header as="h2">Plan, Do, Review</Header>

        <div className="pdrBlock">
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

        <div className="pdrBlock">
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

        <div className="pdrBlock">
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

        <div className="pdrBlock">
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
        <Button style={{ marginTop: '1.5em' }} onClick={this.handleSubmit}>
          Save
        </Button>
      </Form>
    );
  }
}

export default AdventureEditForm;

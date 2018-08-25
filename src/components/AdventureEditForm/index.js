import React, { Component } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';

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
    console.log(newState);
    this.setState({ [type]: newState }, () => console.log(this.state));
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('submit');
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
          name="name"
          id="name"
          label="Adventure Name"
          value={this.state.name}
          fluid
          onChange={this.handleChange}
        />
        <Form.Input
          name="themeName"
          id="themeName"
          label="Theme Name"
          value={this.state.themeName}
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

        <Header as="h3">Plan</Header>
        {this.state.pdrPlan.map(x => (
          <div key={x.id}>
            <Form.Input
              name="pdrPlan"
              id={x.id}
              value={x.text}
              onChange={this.handleChangeMultiVariant}
            />
            <Button
              onClick={e => this.handleRemoveMultiVariant('pdrPlan', x.id, e)}
            >
              Remove
            </Button>
          </div>
        ))}

        <Header as="h3">Do</Header>
        {this.state.pdrDo.map(x => (
          <div key={x.id}>
            <Form.Input
              name="pdrDo"
              id={x.id}
              value={x.text}
              onChange={this.handleChangeMultiVariant}
            />
            <Button
              onClick={e => this.handleRemoveMultiVariant('pdrDo', x.id, e)}
            >
              Remove
            </Button>
          </div>
        ))}

        <Header as="h3">Review</Header>
        {this.state.pdrReview.map(x => (
          <div key={x.id}>
            <Form.Input
              name="pdrReview"
              id={x.id}
              value={x.text}
              onChange={this.handleChangeMultiVariant}
            />
            <Button
              onClick={e => this.handleRemoveMultiVariant('pdrReview', x.id, e)}
            >
              Remove
            </Button>
          </div>
        ))}

        <Header as="h3">Safety Tips</Header>
        {this.state.pdrSafetyTips.map(x => (
          <div key={x.id}>
            <Form.Input
              name="pdrSafetyTips"
              id={x.id}
              value={x.text}
              onChange={this.handleChangeMultiVariant}
            />
            <Button
              onClick={e =>
                this.handleRemoveMultiVariant('pdrSafetyTips', x.id, e)
              }
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="pdrSafetyTips"
          onClick={e => this.handleAddMultiVariant('pdrSafetyTips', e)}
        >
          Add Item
        </Button>

        {/* 
          premium activity
          plan
          do
          review
          safety tips
          hidden
        */}
      </Form>
    );
  }
}

export default AdventureEditForm;

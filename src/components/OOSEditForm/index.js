import React, { Component } from 'react';
import { Form, Header, Button, Icon, Select } from 'semantic-ui-react';

class OOSEditForm extends Component {
  constructor(props) {
    super(props);
    const { offerOfService } = props;
    this.state = {
      oosNumber: offerOfService.oosNumber || '',
      firstName: offerOfService.firstName || '',
      lastName: offerOfService.lastName || '',
      preferredName: offerOfService.preferredName || '',
      isYouth: offerOfService.isYouth ? 'yes' : 'no',
      email: offerOfService.email || '',
      parentEmail: offerOfService.parentEmail || '',
      phone1: offerOfService.phone1 || '',
      phone2: offerOfService.phone2 || '',
      prerecruitedBy: offerOfService.prerecruitedBy || '',
      additionalInformation: offerOfService.additionalInformation || '',
      previousExperience: offerOfService.previousExperience || '',
      specialSkills: offerOfService.specialSkills || '',
      assignedAdventureId: offerOfService.assignment
        ? offerOfService.assignment._id
        : 'unassigned',
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleIsYouthChange = this.handleIsYouthChange.bind(this);
  }

  shouldComponentUpdate({ adventures, offerOfService }, nextState) {
    // this is here because for some reason,
    // when changing an OOS assignment, nextProps is null
    return !adventures || !offerOfService ? false : true;
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...this.state,
      isYouth: this.state.isYouth === 'yes' ? true : false,
    };
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        const element = payload[key];
        if (element === '') {
          payload[key] = null;
        }
      }

      if (payload.assignedAdventureId === 'unassigned') {
        payload.assignedAdventureId = null;
      }
    }
    try {
      await this.props.mutate({
        variables: {
          id: this.props.offerOfService.id,
          offerOfService: payload,
        },
      });
    } catch (e) {
      console.log('ERROR');
      console.log(e);
    }
  };

  render() {
    const adventureOptions = this.props.adventures.map(a => ({
      text: a.name,
      value: a._id,
    }));
    adventureOptions.unshift({ text: 'Unassigned', value: 'unassigned' });

    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: '3em' }}>
        <Header as="h3">Personal Information</Header>
        <Form.Input
          name="oosNumber"
          id="oosNumber"
          label="Offer of Service Number"
          value={this.state.oosNumber}
          fluid
          onChange={this.handleChange}
        />
        <Form.Group widths="equal">
          <Form.Input
            name="lastName"
            id="lastName"
            label="Last Name"
            value={this.state.lastName}
            fluid
            onChange={this.handleChange}
          />
          <Form.Input
            name="firstName"
            id="firstName"
            label="First Name"
            value={this.state.firstName}
            fluid
            onChange={this.handleChange}
          />
          <Form.Input
            name="preferredName"
            id="preferredName"
            label="Preferred Name"
            value={this.state.preferredName}
            fluid
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group inline>
          <label>Is Youth Member (under 18)</label>
          <Form.Radio
            name="isYouth"
            label="No"
            value="no"
            checked={this.state.isYouth === 'no'}
            onChange={this.handleChange}
          />
          <Form.Radio
            name="isYouth"
            label="Yes"
            value="yes"
            checked={this.state.isYouth === 'yes'}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Header as="h3">Contact Information</Header>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            id="email"
            label="Email Address"
            value={this.state.email}
            fluid
            onChange={this.handleChange}
          />
          <Form.Input
            name="parentEmail"
            id="parentEmail"
            label="Parent/Guardian Email (if applicable)"
            value={this.state.parentEmail}
            fluid
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            name="phone1"
            id="phone1"
            label="Primary Phone Number"
            value={this.state.phone1}
            fluid
            onChange={this.handleChange}
          />
          <Form.Input
            name="phone2"
            id="phone2"
            label="Secondary Phone Number"
            value={this.state.phone2}
            fluid
            onChange={this.handleChange}
          />
        </Form.Group>

        <Header as="h3">Assignment Information</Header>

        <Form.Group widths="equal">
          <Form.Field
            control={Select}
            name="assignedAdventureId"
            id="assignedAdventureId"
            label="Assigned Adventure"
            options={adventureOptions}
            onChange={this.handleChange}
            fluid
            search
            value={this.state.assignedAdventureId}
          />

          <Form.Input
            name="prerecruitedBy"
            id="prerecruitedBy"
            label="Pre-Recruited By"
            value={this.state.prerecruitedBy}
            fluid
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.TextArea
            name="additionalInformation"
            id="additionalInformation"
            label="Additional Information"
            value={this.state.additionalInformation}
            onChange={this.handleChange}
          />
          <Form.TextArea
            name="previousExperience"
            id="previousExperience"
            label="Previous Experience"
            value={this.state.previousExperience}
            onChange={this.handleChange}
          />
          <Form.TextArea
            name="specialSkills"
            id="specialSkills"
            label="Special Skills/Qualifications"
            value={this.state.specialSkills}
            onChange={this.handleChange}
          />
        </Form.Group>

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

export default OOSEditForm;

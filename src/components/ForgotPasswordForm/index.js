import React, { Component } from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    username: '',
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async e => {
    e.preventDefault();
    const { username } = this.state;
    if (username.length > 0) {
      await this.props.mutation({
        variables: {
          username,
        },
      });
    }
  };

  render() {
    return (
      <>
        <p>
          Enter your email address below and we'll send you a link to create a
          new password via email.
        </p>
        <Form size="large" onSubmit={this.handleSubmit} noValidate>
          <Segment>
            <Form.Input
              autoFocus
              name="username"
              type="email"
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              autoCapitalize="none"
              onChange={this.handleChange}
            />

            <Button color="teal" fluid size="large">
              Reset My Password
            </Button>
          </Segment>
        </Form>
      </>
    );
  }
}

export default ForgotPasswordForm;

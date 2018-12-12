import React, { Component } from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
  }
  state = {
    password: '',
    confirmPassword: '',
    showPassword: false,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  toggleShowPassword = e =>
    this.setState({
      showPassword: !this.state.showPassword,
    });

  handleSubmit = async e => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    const { passwordResetToken } = this.props;

    if (password !== confirmPassword) {
      alert('No matchy!');
      return;
    }

    await this.props.mutation({
      variables: {
        password,
        passwordResetToken,
      },
    });
  };

  render() {
    return (
      <>
        <p>Create a new password below:</p>
        <Form size="large" onSubmit={this.handleSubmit} noValidate>
          <Segment>
            <Form.Input
              autoFocus
              name="password"
              type={this.state.showPassword ? 'text' : 'password'}
              fluid
              icon={this.state.showPassword ? 'eye' : 'lock'}
              iconPosition="left"
              placeholder="New Password"
              autoCapitalize="none"
              onChange={this.handleChange}
            />{' '}
            <Form.Input
              name="confirmPassword"
              type={this.state.showPassword ? 'text' : 'password'}
              fluid
              icon={this.state.showPassword ? 'eye' : 'lock'}
              iconPosition="left"
              placeholder="Confirm new Password"
              autoCapitalize="none"
              onChange={this.handleChange}
            />
            <Form.Checkbox
              onChange={this.toggleShowPassword}
              label="Show Password"
            />
            <Button
              color="teal"
              fluid
              size="large"
              disabled={
                this.state.password.length === 0 ||
                this.state.password !== this.state.confirmPassword
              }
            >
              Reset My Password
            </Button>
          </Segment>
        </Form>
      </>
    );
  }
}

export default ResetPasswordForm;

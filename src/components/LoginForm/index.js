import React, { Component } from 'react';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
} from 'semantic-ui-react';
import { Link } from '@reach/router';
import { utoa } from '../../lib/base64';
import styles from './LoginForm.module.css';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async e => {
    const { username, password } = this.state;
    e.preventDefault();
    await this.props.mutate({
      variables: {
        username,
        password,
      },
    });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.error !== undefined &&
      this.props.error !== prevProps.error
    ) {
      this.setState({ password: '' });
    }
  }

  render() {
    const { error } = this.props;
    return (
      <Grid
        textAlign="center"
        style={{ height: '100%' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="left">
            Log in to start your PJ Adventure
          </Header>
          {(error &&
            error.graphQLErrors.map(x => (
              <Message key={utoa(x.message)} negative>
                {x.message}
              </Message>
            ))) ||
            null}

          <Form size="large" onSubmit={this.handleSubmit} noValidate>
            <Segment>
              <Form.Input
                className={styles.login}
                autoFocus
                name="username"
                type="email"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Email Address"
                autoCapitalize="none"
                onChange={this.handleChange}
                value={this.state.username}
              />
              <Form.Input
                className={styles.login}
                name="password"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
              <Button color="teal" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Link to="/forgotPassword">
            <Button fluid size="large" style={{ marginTop: '1em' }}>
              Forgot your Password?
            </Button>
          </Link>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginForm;

import React, { Component } from 'react';
import {
  Grid,
  Form,
  Segment,
  Container,
  Button,
  Header,
  Message,
} from 'semantic-ui-react';
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

  render() {
    const { error } = this.props;
    return (
      <Container style={{ paddingTop: '7em' }}>
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
                <Message key={btoa(x.message)} negative>
                  {x.message}
                </Message>
              ))) ||
              null}

            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  name="username"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={this.handleChange}
                />
                <Form.Input
                  name="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Button color="teal" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              <a href="#">Forgot your Password?</a>
            </Message>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default LoginForm;

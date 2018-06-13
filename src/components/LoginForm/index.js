import React, { Component } from 'react';

class LoginForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();
    await this.props.mutate({
      variables: {
        username: this.username.value,
        password: this.password.value,
      },
    });
    this.username.value = '';
    this.password.value = '';
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <input
              autoFocus={true}
              ref={node => {
                this.username = node;
              }}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              ref={node => {
                this.password = node;
              }}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;

import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Container, Menu, Responsive } from 'semantic-ui-react';

import LoginLogout from '../LoginLogout';

class NavBar extends Component {
  state = {};

  handleOnUpdate = (e, { width }) => this.setState({ width });

  render() {
    const { width } = this.state;
    const headerText =
      width >= Responsive.onlyMobile.maxWidth
        ? 'Pacific Jamboree 2019 – Adventure'
        : 'PJ 2019 – Adventure';
    return (
      <Responsive as="header" fireOnMount onUpdate={this.handleOnUpdate}>
        <Menu color="teal" inverted borderless fixed="top">
          <Container style={{ width: '100%' }}>
            <Menu.Item header className="borderless">
              <Link to="/">{headerText}</Link>
            </Menu.Item>

            <Menu.Menu position="right">
              <LoginLogout />
            </Menu.Menu>
          </Container>
        </Menu>
      </Responsive>
    );
  }
}

export default NavBar;

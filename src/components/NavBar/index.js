import React from 'react';
import { Link } from '@reach/router';
import { Container, Menu } from 'semantic-ui-react';
import LoginLogout from '../LoginLogout';

export default () => (
  <header>
    <Menu color="teal" inverted borderless fixed="top">
      <Container>
        <Menu.Item header className="borderless">
          <Link to="/">Pacific Jamboree 2019 – Adventure</Link>
        </Menu.Item>

        <Menu.Menu position="right">
          <LoginLogout />
        </Menu.Menu>
      </Container>
    </Menu>
  </header>
);

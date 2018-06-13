import React from 'react';
import { Link } from '@reach/router';
import { Container, Menu } from 'semantic-ui-react';
import LoginLogout from '../LoginLogout';

export default () => (
  <header>
    <Menu fixed="top" color="blue" inverted>
      <Container>
        <Menu.Item header>
          <Link to="/">Pacific Jamboree 2019 – Adventure</Link>
        </Menu.Item>

        <Menu.Menu position="right">
          <LoginLogout />
        </Menu.Menu>
      </Container>
    </Menu>
  </header>
);

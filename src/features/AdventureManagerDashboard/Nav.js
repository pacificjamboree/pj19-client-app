import React from 'react';
import { Link } from '@reach/router';
import { Menu } from 'semantic-ui-react';

const Nav = () => (
  <Menu fluid vertical>
    <Menu.Item>
      <Link to=".">Home</Link>
    </Menu.Item>

    <Menu.Item>
      <Menu.Header>Adventures</Menu.Header>

      <Menu.Menu>
        <Menu.Item>
          <Link to="adventures/mine">My Adventure</Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu.Item>
  </Menu>
);

export default Nav;

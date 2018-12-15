import React from 'react';
import { Link } from '@reach/router';
import { Menu } from 'semantic-ui-react';

const Nav = () => (
  <Menu fluid vertical>
    <Menu.Item>
      <Link to=".">Home</Link>
    </Menu.Item>
    <Menu.Item>
      <Menu.Header>Offers of Service</Menu.Header>

      <Menu.Menu>
        <Menu.Item>
          <Link to="oos">OOS List</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="oos/import">Import OOS</Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu.Item>

    <Menu.Item>
      <Menu.Header>Patrols</Menu.Header>

      <Menu.Menu>
        <Menu.Item>Patrol List</Menu.Item>
        <Menu.Item>Import Patrols</Menu.Item>
      </Menu.Menu>
    </Menu.Item>

    <Menu.Item>
      <Menu.Header>Adventures</Menu.Header>

      <Menu.Menu>
        <Menu.Item>
          <Link to="adventures">Adventure List</Link>
        </Menu.Item>
        <Menu.Item>Add new Adventure</Menu.Item>
      </Menu.Menu>
    </Menu.Item>

    <Menu.Item>
      <Menu.Header>Users</Menu.Header>

      <Menu.Menu>
        <Menu.Item>User List</Menu.Item>
      </Menu.Menu>
    </Menu.Item>
  </Menu>
);

export default Nav;

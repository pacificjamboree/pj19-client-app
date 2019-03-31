import React from 'react';
import { Link } from '@reach/router';
import { Menu } from 'semantic-ui-react';

const Nav = ({ adventureSlug }) => (
  <Menu fluid vertical>
    <Menu.Item>
      <Link to=".">Home</Link>
    </Menu.Item>

    <Menu.Item>
      <Menu.Header>Adventures</Menu.Header>

      <Menu.Menu>
        <Menu.Item>
          <Link to={`adventures/${adventureSlug}`}>My Adventure</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/adventures">Adventure Descriptions</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/guide">Adventure Guide</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/faq">FAQ</Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu.Item>
  </Menu>
);

export default Nav;

import React from 'react';
import { Query } from 'react-apollo';
import { Sidebar, Menu } from 'semantic-ui-react';
import { Link } from '@reach/router';

import { GET_NAVBAR_VISIBILITY_STATE } from '../../graphql/queries';

const SideNav = ({ children }) => (
  <Query query={GET_NAVBAR_VISIBILITY_STATE}>
    {({ data: { navbarVisible } }) => {
      return (
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="push"
            width="thin"
            visible={navbarVisible}
            vertical
            inverted
          >
            <Menu.Item>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/adventures">Adventures</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/adventure_guide">Adventure Guide</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/faq">FAQ</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/Contact">Contact</Link>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher
            style={{
              minHeight: '100vh',
              display: 'grid',
              gridTemplateRows: 'auto 1fr auto',
              gridTemplateColumns: '100%',
            }}
          >
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      );
    }}
  </Query>
);

export default SideNav;
//

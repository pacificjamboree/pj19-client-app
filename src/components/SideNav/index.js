import React from 'react';
import { Query } from 'react-apollo';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
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
            icon="labeled"
            vertical
            inverted
          >
            <Menu.Item name="home">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item name="gamepad">
              <Icon name="gamepad" />
              Games
            </Menu.Item>
            <Menu.Item name="camera">
              <Icon name="camera" />
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>{children}</Sidebar.Pusher>
        </Sidebar.Pushable>
      );
    }}
  </Query>
);

export default SideNav;
//

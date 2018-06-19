import React from 'react';
import { compose, graphql, Mutation } from 'react-apollo';
import { Sidebar, Menu } from 'semantic-ui-react';
import { Link } from '@reach/router';
import { UPDATE_NAVBAR_VISIBILITY_STATE } from '../../graphql/queries';
import {
  GET_NAVBAR_VISIBILITY_STATE,
  GET_LOGIN_STATE,
} from '../../graphql/queries';

const ToggleLink = ({ to, children }) => {
  return (
    <Mutation
      mutation={UPDATE_NAVBAR_VISIBILITY_STATE}
      variables={{
        visible: false,
      }}
    >
      {toggle => {
        return (
          <Link to={to} onClick={toggle}>
            {children}
          </Link>
        );
      }}
    </Mutation>
  );
};

const SideNav = props => {
  const { children } = props;
  const { loggedIn } = props.getLoginStateQuery;
  const { navbarVisible } = props.getNavbarVisibilityStateQuery;
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
          {!loggedIn ? (
            <ToggleLink to="/login">Login</ToggleLink>
          ) : (
            <ToggleLink to="/logout">Logout</ToggleLink>
          )}
        </Menu.Item>
        <Menu.Item>
          <ToggleLink to="/">Home</ToggleLink>
        </Menu.Item>
        <Menu.Item>
          <ToggleLink to="/adventures">Adventures</ToggleLink>
        </Menu.Item>
        <Menu.Item>
          <ToggleLink to="/adventure_guide">Adventure Guide</ToggleLink>
        </Menu.Item>
        <Menu.Item>
          <ToggleLink to="/faq">FAQ</ToggleLink>
        </Menu.Item>
        <Menu.Item>
          <ToggleLink to="/Contact">Contact</ToggleLink>
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
};

export default compose(
  graphql(GET_NAVBAR_VISIBILITY_STATE, {
    name: 'getNavbarVisibilityStateQuery',
  }),
  graphql(GET_LOGIN_STATE, { name: 'getLoginStateQuery' })
)(SideNav);

import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Container, Menu, Icon, Responsive } from 'semantic-ui-react';
import { Query, Mutation } from 'react-apollo';
import LoginLogout from '../LoginLogout';
import {
  GET_NAVBAR_VISIBILITY_STATE,
  UPDATE_NAVBAR_VISIBILITY_STATE,
} from '../../graphql/queries';

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
      <Query query={GET_NAVBAR_VISIBILITY_STATE}>
        {({ data: { navbarVisible } }) => (
          <Mutation
            mutation={UPDATE_NAVBAR_VISIBILITY_STATE}
            variables={{
              visible: !navbarVisible,
            }}
          >
            {(toggle, { data, error }) => (
              <Responsive
                as="header"
                fireOnMount
                onUpdate={this.handleOnUpdate}
              >
                <Menu color="teal" inverted borderless fixed="top">
                  <Container style={{ width: '100%' }}>
                    <Menu.Item
                      onClick={toggle}
                      role="button"
                      active={navbarVisible}
                      as="button"
                      style={{ border: 'none' }}
                    >
                      <Icon name="sidebar" />
                    </Menu.Item>
                    <Menu.Item header className="borderless">
                      <Link to="/">{headerText}</Link>
                    </Menu.Item>

                    <Menu.Menu position="right">
                      <LoginLogout />
                    </Menu.Menu>
                  </Container>
                </Menu>
              </Responsive>
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default NavBar;

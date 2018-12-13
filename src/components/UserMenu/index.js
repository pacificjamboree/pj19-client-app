import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { navigate } from '@reach/router';
import { withApollo } from 'react-apollo';
import { GET_VIEWER_USERNAME } from '../../graphql/queries';

const UserMenu = ({ client }) => {
  const data = client.readQuery({ query: GET_VIEWER_USERNAME });
  return data.viewer ? (
    <Dropdown item text={data.viewer.username}>
      <Dropdown.Menu>
        <Dropdown.Item
          as="a"
          href="/logout"
          onClick={e => {
            e.preventDefault();
            navigate('/logout');
          }}
        >
          Logout
          <i className="icon sign out" />
        </Dropdown.Item>

        <Dropdown.Item>List Item</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Header Item</Dropdown.Header>
        <Dropdown.Item>
          <i className="dropdown icon" />
          <span className="text">Submenu</span>
          <Dropdown.Menu>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Item>
        <Dropdown.Item>List Item</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ) : null;
};

export default withApollo(UserMenu);

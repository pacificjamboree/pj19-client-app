import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { navigate } from '@reach/router';
import { withApollo } from 'react-apollo';
import { GET_VIEWER_USERNAME } from '../../graphql/queries';

const UserMenu = ({ client }) => {
  const { viewer } = client.readQuery({ query: GET_VIEWER_USERNAME });
  return viewer ? (
    <Dropdown item text={viewer.username}>
      <Dropdown.Menu>
        <Dropdown.Item
          as="a"
          href="/logout"
          onClick={e => {
            e.preventDefault();
            navigate('/logout');
          }}
        >
          Logout<i className="icon sign out" />
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

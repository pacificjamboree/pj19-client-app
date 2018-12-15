import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import { Link } from '@reach/router';
import AdventureLabels from '../AdventureLabels';
const itemStyles = {
  marginBottom: '1em',
};

const AdventureListItem = ({ adventure }) => (
  <List.Item style={itemStyles}>
    <Link to={`${adventure.id}`}>
      <List.Header as="h3">
        {adventure.themeName} ({adventure.name}){' '}
        <Icon name="arrow circle right" />
      </List.Header>
    </Link>
    <AdventureLabels adventure={adventure} />
    <p>{adventure.description}</p>
  </List.Item>
);

export default AdventureListItem;

import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import { Link } from '@reach/router';
import ReactMarkdown from 'react-markdown';
import AdventureLabels from '../AdventureLabels';

const itemStyles = {
  marginBottom: '1em',
};

const AdventureListItem = ({
  adventure,
  showLocation = true,
  showCapacity = true,
}) => (
  <List.Item style={itemStyles}>
    <Link to={`/adventures/${adventure.id}`}>
      <List.Header as="h3">
        {adventure.fullName} <Icon name="arrow circle right" />
      </List.Header>
    </Link>
    <AdventureLabels
      adventure={adventure}
      location={showLocation}
      showCapacity={showCapacity}
    />
    <ReactMarkdown source={adventure.description} />
  </List.Item>
);

export default AdventureListItem;

import React from 'react';
import { List, Icon, Label, Container } from 'semantic-ui-react';
import { Link } from '@reach/router';
import PremiumAdventureLabel from '../PremiumAdventureLabel';
import FeeLabel from '../FeeLabel';
import DurationLabel from '../DurationLabel';

const itemStyles = {
  marginBottom: '1em',
};

const AdventureListItem = ({ adventure }) => (
  <List.Item style={itemStyles}>
    <Link to={`/adventures/${adventure.id}`}>
      <List.Header as="h3">
        {adventure.themeName} ({adventure.name}){' '}
        <Icon name="arrow circle right" />
      </List.Header>
    </Link>
    <Container
      style={{
        margin: '1em 0',
      }}
    >
      {adventure.fee ? <FeeLabel fee={adventure.fee} /> : null}
      {adventure.premiumAdventure ? <PremiumAdventureLabel /> : null}
      <DurationLabel duration={adventure.periodsRequired} />
      <Label>{adventure.capacityPerPeriod} Participants per Period</Label>
    </Container>
    <p>{adventure.description}</p>
  </List.Item>
);

export default AdventureListItem;

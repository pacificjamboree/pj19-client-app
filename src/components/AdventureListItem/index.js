import React from 'react';
import { List, Icon, Label, Container } from 'semantic-ui-react';
import { Link } from '@reach/router';

const PremiumAdventureLabel = () => (
  <Label color="yellow">
    <Icon name="star" />Premium Adventure
  </Label>
);

const FeeLabel = ({ fee }) => (
  <Label color="purple">
    <Icon name="money" />Participant Fee: ${fee}
  </Label>
);

const DurationLabel = ({ duration }) => {
  let text;
  switch (duration) {
    case 1:
      text = 'Half Day Adventure';
      break;
    case 2:
      text = 'Full Day Adventure';
      break;
    case 3:
      text = 'Overnight Adventure';
      break;
    default:
      text = '';
      break;
  }
  return <Label>{text}</Label>;
};

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

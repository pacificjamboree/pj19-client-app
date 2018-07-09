import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
const TYPES = {
  PLAN: {
    title: 'Plan',
    color: 'orange',
  },
  DO: {
    title: 'Do',
    color: 'green',
  },
  REVIEW: {
    title: 'Review',
    color: 'purple',
  },
  SAFETY_TIPS: {
    title: 'Safety Tips',
    color: 'red',
  },
};

const listItems = items => items.map(i => <li key={btoa(i)}>{i}</li>);

const PlanDoReviewCard = ({ type, items }) => {
  const { title, color } = TYPES[type];
  return (
    <Grid.Column>
      <Segment color={color}>
        <Header as="h3">{title}</Header>
        <ul>{listItems(items)}</ul>
      </Segment>
    </Grid.Column>
  );
};

export default PlanDoReviewCard;

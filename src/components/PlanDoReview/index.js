import React from 'react';
import { Grid } from 'semantic-ui-react';
import PlanDoReviewCard from './PlanDoReviewCard';

const PlanDoReview = props => (
  <Grid stackable columns={2}>
    <Grid.Row stretched>
      <PlanDoReviewCard type="PLAN" items={props.plan} />
      <PlanDoReviewCard type="DO" items={props.do} />
    </Grid.Row>
    <Grid.Row stretched>
      <PlanDoReviewCard type="REVIEW" items={props.review} />
      <PlanDoReviewCard type="SAFETY_TIPS" items={props.safetyTips} />
    </Grid.Row>
  </Grid>
);

export default PlanDoReview;

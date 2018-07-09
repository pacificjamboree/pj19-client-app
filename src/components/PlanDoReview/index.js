import React from 'react';
import { Grid } from 'semantic-ui-react';
import PDRTile from './PDRTile';

const PlanDoReview = props => (
  <Grid stackable columns={2}>
    <Grid.Row stretched>
      <PDRTile type="PLAN" items={props.plan} />
      <PDRTile type="DO" items={props.do} />
    </Grid.Row>
    <Grid.Row stretched>
      <PDRTile type="REVIEW" items={props.review} />
      <PDRTile type="SAFETY_TIPS" items={props.safetyTips} />
    </Grid.Row>
  </Grid>
);

export default PlanDoReview;

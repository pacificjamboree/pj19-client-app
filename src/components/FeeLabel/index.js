import React from 'react';
import { Label, Icon } from 'semantic-ui-react';

const FeeLabel = ({ fee }) => (
  <Label color="purple">
    <Icon name="money" />Participant Fee: ${fee}
  </Label>
);

export default FeeLabel;

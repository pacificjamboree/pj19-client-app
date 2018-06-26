import React from 'react';
import { Label } from 'semantic-ui-react';

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

export default DurationLabel;

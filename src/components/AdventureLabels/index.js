import React from 'react';
import { Label } from 'semantic-ui-react';
import FeeLabel from '../FeeLabel';
import DurationLabel from '../DurationLabel';
import PremiumAdventureLabel from '../PremiumAdventureLabel';
import './AdventureLabels.css';

const AdventureLabels = ({ adventure }) => (
  <div className="adventureLabels">
    {adventure.fee ? <FeeLabel fee={adventure.fee} /> : null}
    {adventure.premiumAdventure ? <PremiumAdventureLabel /> : null}
    <DurationLabel duration={adventure.periodsRequired} />
    <Label>{adventure.capacityPerPeriod} Participants per Period</Label>
  </div>
);

export default AdventureLabels;

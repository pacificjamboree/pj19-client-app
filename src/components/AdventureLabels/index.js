import React from 'react';
import { Label } from 'semantic-ui-react';
import FeeLabel from '../FeeLabel';
import DurationLabel from '../DurationLabel';
import PremiumAdventureLabel from '../PremiumAdventureLabel';
import './AdventureLabels.css';

const AdventureLabels = ({ adventure, location = false }) => (
  <div className="adventureLabels">
    {location && (
      <Label>{adventure.location.replace(/^\w/, c => c.toUpperCase())}</Label>
    )}
    {adventure.fee ? <FeeLabel fee={adventure.fee} /> : null}
    {adventure.premiumAdventure ? <PremiumAdventureLabel /> : null}
    <DurationLabel duration={adventure.periodsRequired} />
    <Label>{adventure.capacityPerPeriod} Participants per Period</Label>
  </div>
);

export default AdventureLabels;

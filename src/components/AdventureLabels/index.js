import React from 'react';
import { Label } from 'semantic-ui-react';
import FeeLabel from '../FeeLabel';
import DurationLabel from '../DurationLabel';
import PremiumAdventureLabel from '../PremiumAdventureLabel';
import './AdventureLabels.css';

const AdventureLabels = ({
  adventure,
  location = false,
  showCapacity = true,
}) => (
  <div className="adventureLabels">
    {adventure.fee ? <FeeLabel fee={adventure.fee} /> : null}
    {adventure.premiumAdventure ? <PremiumAdventureLabel /> : null}
    <DurationLabel duration={adventure.periodsRequired} />
    {location && (
      <Label>
        {adventure.location
          .replace(/^\w/, c => c.toUpperCase())
          .replace('site', '-site')}
      </Label>
    )}
  </div>
);

export default AdventureLabels;

import React from 'react';
import { Card, Checkbox, Grid, Icon, Label, Dropdown } from 'semantic-ui-react';
const styles = require('./styles.module.css');

export default ({ oos, changeHandler, adventures }) => {
  const {
    oosNumber,
    lastName,
    firstName,
    preferredName,
    isYouth,
    email,
    parentEmail,
    prerecruited,
    prerecruitedBy,
    previousExperience,
    specialSkills,
    additionalInformation,
    importOOS,
    assignedAdventureId,
  } = oos;

  const handleToggle = (e, data) => {
    changeHandler({ ...oos, importOOS: data.checked });
  };

  const handlAdventureChange = (e, { value }) => {
    changeHandler({
      ...oos,
      assignedAdventureId: value,
    });
  };

  const isYouthBool = isYouth === 'Y' ? true : false;

  return (
    <Card fluid color={isYouthBool ? 'red' : null}>
      <Card.Content>
        <Card.Header className={!importOOS ? styles.disabled : ''}>
          {`${lastName}, ${firstName}`}
          {preferredName && ` (${preferredName})`}
        </Card.Header>
        <Card.Meta>OOS Number: {oosNumber}</Card.Meta>
        <Card.Description className={!importOOS ? styles.disabled : ''}>
          <p>
            <span className={styles.label}>Pre-Recruited: </span>
            {prerecruited === 'Yes'
              ? `Yes – By ${prerecruitedBy}`
              : prerecruited}
          </p>

          <p>
            <span className={styles.label}>Email Address: </span>
            {email}
            {isYouthBool && (
              <span className={styles.parentEmail}>
                <span className={styles.label}> Parent Email: </span>
                {parentEmail}
              </span>
            )}
          </p>

          <p>
            <span className={styles.label}>Previous Jamboree Experience: </span>
            {previousExperience}
          </p>
          <p>
            <span className={styles.label}>Special Skills: </span>
            {specialSkills}
          </p>
          <p>
            <span className={styles.label}>Additional Information: </span>
            {additionalInformation}
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid verticalAlign="middle" columns={3}>
          <Grid.Column>
            <Checkbox
              toggle
              checked={importOOS}
              label="Import OOS"
              onChange={handleToggle}
            />
          </Grid.Column>
          <Grid.Column textAlign="center">
            <label className={styles.assignmentLabel} htmlFor="assignment">
              Assign to Adventure:
            </label>{' '}
            <Dropdown
              disabled={!importOOS}
              name={`assignment${oosNumber}`}
              id={`assignment${oosNumber}`}
              search
              selection
              value={assignedAdventureId}
              label="Assign OOS to Adventure"
              onChange={handlAdventureChange}
              options={adventures}
            />
          </Grid.Column>
          <Grid.Column textAlign="right">
            {isYouthBool ? (
              <Label color="red" horizontal>
                <Icon name="exclamation triangle" />
                Is a Youth Member
              </Label>
            ) : null}
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

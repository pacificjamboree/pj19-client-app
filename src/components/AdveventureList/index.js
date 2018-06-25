import React, { Fragment } from 'react';
import { Header, List } from 'semantic-ui-react';
import AdventureListItem from '../AdventureListItem';

const AdventureList = ({ title, adventures, children }) => (
  <Fragment>
    <Header as="h2">{title}</Header>
    {children}
    <List>
      {adventures.map(a => (
        <AdventureListItem key={a.adventureCode} adventure={a} />
      ))}
    </List>
  </Fragment>
);

export default AdventureList;

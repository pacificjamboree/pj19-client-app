import React from 'react';
import { Container, Header } from 'semantic-ui-react';
const NotFound = ({
  title = "Sorry, we couldn't find that page",
  children,
}) => (
  <Container>
    <Header as="h1">{title}</Header>
    {children}
  </Container>
);

export default NotFound;

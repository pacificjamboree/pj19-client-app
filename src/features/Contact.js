import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const Contact = () => (
  <Container text>
    <Header as="h1">Contact the Adventure Team</Header>
    <p>
      The PJ Adventure team can be contacted by email at
      adventure@pacificjamboree.ca
    </p>
    . Please keep a few things in mind when you email us:
    <ul>
      <li>
        Please include your Patrol Number when you contact us. Your Patrol
        Number is in the format A-123.
      </li>
      <li>
        We can only answer questions related to Adventure. If you have questions
        related to other Jamboree functions, such as transportation,
        registration, etc, please contact those departments directly.
      </li>
      <li>
        We appreciate your patience. Like everyone working to put on PJ 2019, we
        are all volunteers. We will respond to your email as soon as we are able
        to.
      </li>
    </ul>
  </Container>
);

export default Contact;

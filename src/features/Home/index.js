import React from 'react';
import { Card, Container, Header, Image } from 'semantic-ui-react';
import { Link, Redirect } from '@reach/router';
import Query from '../../components/Query';
import climb from './images/climb.jpg';
import { GET_LOGIN_STATE } from '../../graphql/queries';

const Home = () => (
  <Query query={GET_LOGIN_STATE}>
    {({ data }) => {
      if (data.loggedIn) {
        return <Redirect noThrow to="/dashboard" />;
      }
      return (
        <div>
          <Image src={climb} alt="A scout in climbing equipment at PJ 2015" />
          <Container text style={{ paddingBottom: '4em' }}>
            <Header
              style={{ margin: '1em', fontSize: '3em' }}
              as="h1"
              textAlign="center"
            >
              Get ready for your PJ Adventure!
            </Header>
            <Card.Group stackable itemsPerRow={2}>
              <Card as={Link} to="/adventures" color="red">
                <Card.Content>
                  <Card.Header>Adventure Descriptions</Card.Header>
                  <Card.Description>
                    Descriptions of all the exicting Adventures available to you
                    at the 2019 Pacific Jamboree
                  </Card.Description>
                </Card.Content>
              </Card>

              <Card as={Link} to="/guide" color="green">
                <Card.Content>
                  <Card.Header>Adventure Guide</Card.Header>
                  <Card.Description>
                    The Adventure Guide contains everything you need to know
                    about your week of Adventure at PJ 2019. Be Prepared: make
                    sure to read it throughly!
                  </Card.Description>
                </Card.Content>
              </Card>

              <Card as={Link} to="/faq" color="purple">
                <Card.Content>
                  <Card.Header>Frequently Asked Questions</Card.Header>
                  <Card.Description>
                    Have a question about PJ Adventure? The answer might be in
                    our FAQ.
                  </Card.Description>
                </Card.Content>
              </Card>

              <Card as={Link} to="/contact" color="blue">
                <Card.Content>
                  <Card.Header>Contact</Card.Header>
                  <Card.Description>
                    Need to talk to us? Find out how here.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Container>

          <Container text>
            <p>
              Welcome to the 2019 Pacific Jamboree! The Adventure Team is ready
              to welcome you to beautiful Camp Barnard this July. Your patrol
              will have an opportunity to participate in a wide variety of
              Adventures during your week at the Jamboree. From Archery to Wild
              Play and everything in between, there's something for evryone at
              PJ.
            </p>
            <p>
              The information on this site will help your patrol prepare for
              your week of Advnture at PJ. Here you will find{' '}
              <Link to="/adventures">descriptions of the Adventures</Link>, and
              information on how your Patrol will make your Adventure
              selections.
            </p>
            <p>
              The <Link to="/guide">Adventure Guide</Link> contains a lot of
              information on the Adventures available at PJ, how to mkae your
              selections, and what you can expect when you arrive at the
              Jamboree.
            </p>
            <p>
              We can't wait to see you at the Pacific Jamboree this summer! Be
              prepared to have an amazing adventure!
            </p>

            <p>
              <em>– The PJ Adventure Team</em>
            </p>
          </Container>
        </div>
      );
    }}
  </Query>
);

export default Home;

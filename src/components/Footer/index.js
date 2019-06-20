import React from 'react';
import {
  Segment,
  Container,
  Grid,
  Header,
  List,
  Icon,
} from 'semantic-ui-react';
import { Link } from '@reach/router';

const socialIconStyle = { color: 'white' };

const Footer = () => (
  <Segment inverted vertical className="noprint" style={{ padding: '5em 0em' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            {/* <Header inverted as="h4" content="PJ Adventure" /> */}
            <List link inverted>
              <List.Item>
                <Link to="/adventures">Adventures</Link>
              </List.Item>
              <List.Item>
                <Link to="/guide">Adventure Guide</Link>
              </List.Item>
              <List.Item>
                <Link to="/faq">FAQ</Link>
              </List.Item>
              <List.Item>
                <Link to="/contact">Contact Us</Link>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <div style={{ textAlign: 'left' }}>
              <a
                style={socialIconStyle}
                href="https://www.facebook.com/pacificjamboree"
              >
                <Icon size="big" name="facebook official" />
              </a>
              <a
                style={socialIconStyle}
                href="https://twitter.com/pacificjamboree"
              >
                <Icon size="big" name="twitter" />
              </a>
              <a
                style={socialIconStyle}
                href="https://instagram.com/pacificjamboree"
              >
                <Icon size="big" name="instagram" />
              </a>
            </div>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4" inverted>
              Scouts Canada Pacific Jamboree 2019
            </Header>
            <List link inverted>
              <List.Item as="a" href="http://pacificjamboree.ca">
                pacificjamboree.ca
              </List.Item>
              <List.Item as="a" href="http://scouts.ca">
                scouts.ca
              </List.Item>
              <List.Item as="a" href="http://campbarnard.ca">
                campbarnard.ca
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;

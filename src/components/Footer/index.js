import React from 'react';
import {
  Segment,
  Container,
  Grid,
  Header,
  List,
  Icon,
} from 'semantic-ui-react';

const socialIconStyle = { color: 'white' };

const Footer = () => (
  <Segment inverted vertical style={{ padding: '5em 0em' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={2}>
            {/* <Header inverted as="h4" content="PJ Adventure" /> */}
            <List link inverted>
              <List.Item as="a">Adventure Guide</List.Item>
              <List.Item as="a">FAQ</List.Item>
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

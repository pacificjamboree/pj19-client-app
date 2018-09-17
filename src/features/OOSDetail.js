import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import {
  Container,
  Loader,
  Header,
  Table,
  Segment,
  Grid,
  Button,
  Icon,
} from 'semantic-ui-react';
import { Link } from '@reach/router';
import differenceInYears from 'date-fns/difference_in_years';
import { GET_OFFER_OF_SERVICE_BY_ID } from '../graphql/queries';
import UserHasRole from '../components/UserHasRole';

const OOSDetail = ({ id }) => (
  <Container>
    <Query query={GET_OFFER_OF_SERVICE_BY_ID} variables={{ id }}>
      {({ data: { offerOfService }, loading, error }) => {
        if (loading) return <Loader active />;
        if (error) return <p>Error</p>;

        const {
          oosNumber,
          firstName,
          lastName,
          preferredName,
          fullName,
          birthdate,
          isYouth,
          email,
          parentEmail,
          phone1,
          phone2,
          prerecruited,
          prerecruitedBy,
          additionalInformation,
          previousExperience,
          specialSkills,
          assigned,
          assignment,
        } = offerOfService;

        const age = birthdate =>
          differenceInYears(new Date(), new Date(birthdate));

        return (
          <Fragment>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h1">
                    {fullName} ({oosNumber})
                  </Header>
                </Grid.Column>
                <UserHasRole userRoles={['admin']}>
                  <Grid.Column textAlign="right">
                    <Link to={`./edit`}>
                      <Button icon labelPosition="left" color="teal">
                        <Icon name="edit" />
                        Edit
                      </Button>
                    </Link>
                  </Grid.Column>
                </UserHasRole>
              </Grid.Row>
            </Grid>

            <Header as="h2">{assigned ? assignment.name : 'Unassigned'}</Header>

            {!isYouth ? (
              <Segment inverted color="red">
                {fullName} is a youth member. To maintain two-deep, please CC
                safescouting.pj@scouts.ca on all email communications with this
                OOS.
              </Segment>
            ) : null}

            <Table basic="very">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}>First Name</Table.Cell>
                  <Table.Cell>{firstName}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Preferred Name</Table.Cell>
                  <Table.Cell>{preferredName}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Last Name</Table.Cell>
                  <Table.Cell>{lastName}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Birthdate</Table.Cell>
                  <Table.Cell>
                    {birthdate} ({age(birthdate)})
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Email</Table.Cell>
                  <Table.Cell>
                    <a href="mailto:{email}">{email}</a>
                  </Table.Cell>
                </Table.Row>

                {parentEmail ? (
                  <Table.Row>
                    <Table.Cell>Parent/Guardian Email</Table.Cell>
                    <Table.Cell>
                      <a href="mailto:{parentEmail}">{parentEmail}</a>
                    </Table.Cell>
                  </Table.Row>
                ) : null}

                <Table.Row>
                  <Table.Cell>Phone Number</Table.Cell>
                  <Table.Cell>
                    {phone1} {phone2 ? `/ ${phone2}` : ''}
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Pre-recruited</Table.Cell>
                  <Table.Cell>
                    {!prerecruited ? 'No' : `Yes: ${prerecruitedBy}`}
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Special Skills</Table.Cell>
                  <Table.Cell>{specialSkills}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Previous Experience</Table.Cell>
                  <Table.Cell>{previousExperience}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Additional Information</Table.Cell>
                  <Table.Cell>{additionalInformation}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Fragment>
        );
      }}
    </Query>
  </Container>
);

export default OOSDetail;

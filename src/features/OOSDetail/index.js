import React from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  Container,
  Loader,
  Header,
  Table,
  Segment,
  Grid,
  Button,
  Icon,
  Divider,
  Label,
} from 'semantic-ui-react';
import { Link } from '@reach/router';
import {
  GET_OFFER_OF_SERVICE_BY_OOS_NUMBER,
  SEND_OOS_WELCOME_EMAIL,
  SEND_OOS_ASSIGNMENT_EMAIL,
} from '../../graphql/queries';
import UserHasRole from '../../components/UserHasRole';
import styles from './styles.module.css';
import AddAdventureManagerButton from './AddAdventureManagerButton';
import RemoveAdventureManagerButton from './RemoveAdventureManagerButton';

const OOSDetail = ({ oosNumber }) => (
  <Container>
    <Query query={GET_OFFER_OF_SERVICE_BY_OOS_NUMBER} variables={{ oosNumber }}>
      {({ data: { offerOfService }, loading, error }) => {
        if (loading) return <Loader active />;
        if (error) return <p>Error</p>;

        const {
          id,
          oosNumber,
          firstName,
          lastName,
          preferredName,
          fullName,
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
          isAdventureManager,
        } = offerOfService;

        return (
          <>
            <Grid stackable divided columns={16}>
              <Grid.Column width={10}>
                <Header as="h1">
                  {fullName} ({oosNumber})
                </Header>
                {isAdventureManager ? (
                  <Label color="green" horizontal>
                    <Icon name="star" />
                    Adventure Manager
                  </Label>
                ) : null}
                <Header as="h2">
                  {assigned ? assignment.name : 'Unassigned'}
                </Header>

                {isYouth ? (
                  <Segment inverted color="red">
                    {fullName} is a youth member. To maintain two-deep, please
                    CC safescouting.pj@scouts.ca on all email communications
                    with this OOS.
                  </Segment>
                ) : null}

                <Table basic="very">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width={4} className={styles.label}>
                        First Name
                      </Table.Cell>
                      <Table.Cell>{firstName}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell className={styles.label}>
                        Preferred Name
                      </Table.Cell>
                      <Table.Cell>{preferredName}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell className={styles.label}>
                        Last Name
                      </Table.Cell>
                      <Table.Cell>{lastName}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell className={styles.label}>
                        Is Youth Member
                      </Table.Cell>
                      <Table.Cell>{isYouth ? 'Yes' : 'No'}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell className={styles.label}>Email</Table.Cell>
                      <Table.Cell>
                        <a href="mailto:{email}">{email}</a>
                      </Table.Cell>
                    </Table.Row>

                    {parentEmail ? (
                      <Table.Row>
                        <Table.Cell className={styles.label}>
                          Parent/Guardian Email
                        </Table.Cell>
                        <Table.Cell>
                          <a href="mailto:{parentEmail}">{parentEmail}</a>
                        </Table.Cell>
                      </Table.Row>
                    ) : null}

                    <Table.Row>
                      <Table.Cell className={styles.label}>
                        Phone Number
                      </Table.Cell>
                      <Table.Cell>
                        {phone1} {phone2 ? `/ ${phone2}` : ''}
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell className={styles.label}>
                        Pre-recruited
                      </Table.Cell>
                      <Table.Cell>
                        {!prerecruited ? 'No' : `Yes: ${prerecruitedBy}`}
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell className={styles.label}>
                        Special Skills
                      </Table.Cell>
                      <Table.Cell>{specialSkills}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell className={styles.label}>
                        Previous Experience
                      </Table.Cell>
                      <Table.Cell>{previousExperience}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell className={styles.label}>
                        Additional Information
                      </Table.Cell>
                      <Table.Cell>{additionalInformation}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
              <Grid.Column
                width={6}
                className={styles.actionButtons}
                textAlign="center"
              >
                <UserHasRole userRoles={['admin']}>
                  <Link to={`./edit`}>
                    <Button icon labelPosition="left">
                      <Icon name="edit" />
                      Edit Offer of Service
                    </Button>
                  </Link>

                  <Divider />

                  {isAdventureManager ? (
                    <RemoveAdventureManagerButton
                      offerOfService={offerOfService}
                    />
                  ) : (
                    <AddAdventureManagerButton
                      offerOfService={offerOfService}
                    />
                  )}

                  <Mutation
                    mutation={SEND_OOS_WELCOME_EMAIL}
                    onCompleted={() => {
                      alert('sent');
                    }}
                  >
                    {(sendEmail, { data, error }) => {
                      return (
                        <Button
                          icon
                          labelPosition="left"
                          title="Send welcome email to OOS"
                          onClick={() => {
                            sendEmail({ variables: { id } });
                          }}
                        >
                          <Icon name="mail" />
                          Send Welcome Email
                        </Button>
                      );
                    }}
                  </Mutation>

                  <Mutation
                    mutation={SEND_OOS_ASSIGNMENT_EMAIL}
                    onCompleted={() => {
                      alert('sent');
                    }}
                  >
                    {(sendEmail, { data, error }) => {
                      return (
                        <Button
                          icon
                          labelPosition="left"
                          disabled={!assigned}
                          title={
                            assigned
                              ? 'Send assignment email to OOS'
                              : 'OOS is not assigned to an Adventure'
                          }
                          onClick={() => {
                            sendEmail({ variables: { id } });
                          }}
                        >
                          <Icon name="mail" />
                          Send Assignment Email
                        </Button>
                      );
                    }}
                  </Mutation>
                </UserHasRole>
              </Grid.Column>
            </Grid>
          </>
        );
      }}
    </Query>
  </Container>
);

export default OOSDetail;

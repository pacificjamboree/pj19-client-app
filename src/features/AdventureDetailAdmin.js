import React from 'react';
import { Query } from 'react-apollo';
import {
  Container,
  Loader,
  Header,
  Button,
  Grid,
  Icon,
} from 'semantic-ui-react';
import { Link } from '@reach/router';
import ReactMarkdown from 'react-markdown';
import gql from 'graphql-tag';
import AdventureLabels from '../components/AdventureLabels';
import PlanDoReview from '../components/PlanDoReview';
import UserHasRole from '../components/UserHasRole';
import AdventureOOSList from '../components/AdventureOOSList';
import DocumentTitle from '../components/DocumentTitle';
import AdventurePeriodList from '../components/AdventurePeriodList';

const GET_ADVENTURE_BY_ID = gql`
  query adventureById($searchField: AdventureSearchFields!, $value: String!) {
    adventure(search: { searchField: $searchField, value: $value }) {
      adventureCode
      id
      _id
      name
      themeName
      fullName
      description
      fee
      premiumAdventure
      periodsRequired
      location
      capacityPerPeriod
      periodsOffered
      pdrPlan
      pdrDo
      pdrReview
      pdrSafetyTips
      scoutOnly
      adventurePeriods {
        id
        _id
        startAt
        participantsAssigned {
          scouts
          scouters
          total
        }
        patrols {
          id
          _id
          patrolNumber
          patrolName
          numberOfScouts
          numberOfScouters
        }
      }
    }
  }
`;

const ADMIN_AND_MANAGER = ['adventureManager', 'admin'];

const AdventureDetail = ({ id }) => (
  <Container>
    <Query
      query={GET_ADVENTURE_BY_ID}
      variables={{
        value: id,
        searchField: id.indexOf('==') >= 0 ? 'id' : 'adventureCode',
      }}
    >
      {({ data, loading, error }) => {
        if (loading) return <Loader active />;
        if (error) return <p>Error</p>;
        const { adventure } = data;
        const adventureNameHeaders = adventure => {
          if (adventure.themeName) {
            return (
              <>
                <Header as="h1" style={{ margin: 0 }}>
                  {adventure.themeName}
                </Header>
                <Header as="h2" style={{ margin: 0 }}>
                  ({adventure.name})
                </Header>
              </>
            );
          } else {
            return <Header as="h1">{adventure.name}</Header>;
          }
        };
        return (
          <DocumentTitle title={adventure.fullName}>
            <>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>{adventureNameHeaders(adventure)}</Grid.Column>
                  <UserHasRole userRoles={ADMIN_AND_MANAGER}>
                    <Grid.Column textAlign="right">
                      <Link to={`../${adventure.id}/edit`}>
                        <Button icon labelPosition="left" color="teal">
                          <Icon name="edit" />
                          Edit
                        </Button>
                      </Link>
                    </Grid.Column>
                  </UserHasRole>
                </Grid.Row>
              </Grid>

              <AdventureLabels location={true} adventure={adventure} />

              <ReactMarkdown source={adventure.description} />

              {adventure.oosDescription && (
                <UserHasRole userRoles={ADMIN_AND_MANAGER}>
                  <p>
                    <b>OOS Description for Welcome Message:</b>
                    <br />
                    {adventure.oosDescription}
                  </p>
                </UserHasRole>
              )}

              <Header as="h2">Plan, Do, Review</Header>
              <PlanDoReview
                plan={adventure.pdrPlan}
                do={adventure.pdrDo}
                review={adventure.pdrReview}
                safetyTips={adventure.pdrSafetyTips}
              />
              <UserHasRole userRoles={ADMIN_AND_MANAGER}>
                <AdventureOOSList
                  id={adventure.id}
                  oosRequired={adventure.oosRequired}
                  adultOOSRequired={adventure.adultOOSRequired}
                  adventureName={adventure.name}
                />
              </UserHasRole>

              <UserHasRole userRoles={['admin']}>
                <AdventurePeriodList adventure={adventure} />
              </UserHasRole>
            </>
          </DocumentTitle>
        );
      }}
    </Query>
  </Container>
);

export default AdventureDetail;

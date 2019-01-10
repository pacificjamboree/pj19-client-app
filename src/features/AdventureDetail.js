import React, { Fragment } from 'react';
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
import AdventureLabels from '../components/AdventureLabels';
import PlanDoReview from '../components/PlanDoReview';
import UserHasRole from '../components/UserHasRole';
import AdventureOOSList from '../components/AdventureOOSList';

import { GET_ADVENTURE_BY_ID } from '../graphql/queries';

const ADMIN_AND_MANAGER = ['adventureManager', 'admin'];

const AdventureDetail = ({ id }) => (
  <Container>
    <Query query={GET_ADVENTURE_BY_ID} variables={{ id }}>
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
          <Fragment>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>{adventureNameHeaders(adventure)}</Grid.Column>
                <UserHasRole userRoles={ADMIN_AND_MANAGER}>
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

            <AdventureLabels location={true} adventure={adventure} />
            <p>{adventure.description}</p>

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
          </Fragment>
        );
      }}
    </Query>
  </Container>
);

export default AdventureDetail;

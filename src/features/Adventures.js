import React from 'react';
import { Query } from 'react-apollo';
import { Container, Header, Loader, Divider } from 'semantic-ui-react';
import DocumentTitle from '../components/DocumentTitle';
import AdventureList from '../components/AdveventureList';

import { GET_ADVENTURE_LIST } from '../graphql/queries';

const Adventures = ({ workflowState = 'active' }) => {
  return (
    <DocumentTitle title="Adventure List">
      <Container>
        <Header as="h1">Adventures</Header>
        <p>
          Adventures are the scheduled activities that your Patrol participates
          in at the Jamboree. Each day has two Adventure periods, one in the
          morning and one in the afternoon. Most Adventures are a half-day long,
          but some take the full day and one, the Juan de Fuca Trail, is
          overnight.
        </p>
        <p>
          Many Adventures take place on-site at Camp Barnard, while others are
          off-site at various locations throughout Greater Victoria.
        </p>
        <p>
          Each Adventure has a Trail Card with a series of Plan, Do, and Review
          questions, along with Safety Tips. You will be provided with the cards
          for your assigned Adventures when you arrive at the Jamboree.
        </p>
        <p>
          Most Adventures have no additional fees. SCUBA Diving has an
          additional participant fee due to the cost of specalized equipment and
          instructors required.
        </p>

        <Divider />
        <Query
          query={GET_ADVENTURE_LIST}
          variables={{ workflowState }}
          errorPolicy="ignore"
          notifyOnNetworkStatusChange
        >
          {({ error, data, loading }) => {
            if (error) return <p>whoops</p>;
            if (loading) return <Loader active />;
            if (data) {
              const { adventures } = data;
              const onsiteAdventures = adventures.filter(
                a => a.location === 'onsite'
              );
              const offsiteAdventures = adventures.filter(
                a => a.location === 'offsite'
              );
              return (
                <>
                  <AdventureList
                    title="On-Site Adventures"
                    adventures={onsiteAdventures}
                  >
                    <p>
                      On-site Adventures take place on the Jamboree site at Camp
                      Barnard.
                    </p>
                  </AdventureList>
                  <Divider />
                  <AdventureList
                    title="Off-Site Adventures"
                    adventures={offsiteAdventures}
                  >
                    <p>
                      Off-site adventures take place away from the Jamboree site
                      and involve a bus ride to the Adventure location.
                    </p>
                  </AdventureList>
                </>
              );
            }
          }}
        </Query>
      </Container>
    </DocumentTitle>
  );
};

export default Adventures;

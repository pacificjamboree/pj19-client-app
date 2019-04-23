import React from 'react';
import { Query } from 'react-apollo';
import { Container, Header, Loader, Divider } from 'semantic-ui-react';
import DocumentTitle from '../components/DocumentTitle';
import AdventureList from '../components/AdveventureList';

import { GET_ADVENTURE_LIST } from '../graphql/queries';

const sortByName = (a, b) => {
  if (a.fullName < b.fullName) return -1;
  if (a.fullName > b.fullName) return 1;
  return 0;
};

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
          Adventure activities at PJ 2019 are organized into three (3) groups:
          A, B, and C.
        </p>
        <Divider />
        <Query
          query={GET_ADVENTURE_LIST}
          variables={{ workflowState }}
          errorPolicy="ignore"
          notifyOnNetworkStatusChange
        >
          {({ error, data, loading }) => {
            if (error) {
              console.log(error);
              return <p>Error</p>;
            }
            if (data) {
              if (loading)
                return <Loader active content="Loading Adventures" />;
              const { adventures } = data;

              const GROUP_A = adventures
                .filter(a => a.premiumAdventure)
                .sort(sortByName);

              const GROUP_B = adventures
                .filter(a => !a.premiumAdventure && a.fee === 0)
                .sort(sortByName);

              const GROUP_C = adventures
                .filter(a => !a.premiumAdventure && a.fee)
                .sort(sortByName);

              return (
                <>
                  <AdventureList
                    title="Group A Adventures (Premium Adventures)"
                    adventures={GROUP_A}
                  >
                    <p>
                      Group A Adventures are those that tend to be very popular,
                      have extra requirements in terms of equipment and
                      logistics, or are limited in the number of participants.{' '}
                      <strong>
                        Your Patrol may receive one Group A Adventure on your
                        final schedule; this is not guaranteed. Patrols may
                        receive an additional Group A activity if space permits.
                      </strong>
                    </p>
                  </AdventureList>

                  <Divider />

                  <AdventureList
                    title="Group B Adventures (Standard Adventures)"
                    adventures={GROUP_B}
                  >
                    <p>
                      Group B Adventures will fill the remaining slots on your
                      Adventure schedule. Remember that if you choose an
                      off-site overnight Adventure, it will consume four (4)
                      Adventure periods (e.g. two full days). You will also be
                      assigned one free time slot. If you want more than one
                      free period, please make sure to check the appropriate box
                      on the Adventure Selection form.
                    </p>
                  </AdventureList>

                  <Divider />
                  <AdventureList
                    title="Group C Adventures (Buy-In Adventures)"
                    adventures={GROUP_C}
                  >
                    <p>
                      Group C Adventures are those that, due to the extreme
                      costs and skills involved in this Adventure, carry an
                      additional participant fee. You have the option to opt-out
                      of these Adventures on the Adventure Selection form. If
                      you receive a Group C Adventure, it counts as a Group B
                      Adventure. Details regarding payment will be communicated
                      to Patrol Scouters when final Adventure Schedules are
                      distributed.
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

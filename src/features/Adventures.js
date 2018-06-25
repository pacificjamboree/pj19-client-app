import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Container, Header, Loader, Divider } from 'semantic-ui-react';
import AdventureList from '../components/AdveventureList';

import { GET_ADVENTURE_LIST } from '../graphql/queries';

const Adventures = ({ workflowState = 'active' }) => {
  return (
    <Container>
      <Header as="h1">Adventures</Header>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        convallis felis consectetur quam condimentum ornare. Sed suscipit,
        turpis eu consectetur placerat, massa velit fringilla massa, a sagittis
        est velit non erat. Nunc rhoncus turpis ut magna faucibus malesuada.
        Fusce et eros vitae neque dignissim venenatis. Mauris eu nisl id quam
        semper pellentesque at vel dolor. Nunc lobortis lacus dolor. In
        vestibulum cursus porttitor. Nunc porttitor ante vitae erat auctor
        porta. Aliquam porta luctus eros nec euismod. Quisque at dui non leo
        condimentum fringilla a sit amet massa. Donec dui dolor, porta et
        pellentesque nec, egestas eu tortor. Quisque eu massa justo. Phasellus
        nec ultrices libero. Vestibulum pretium magna eget nisi vestibulum
        accumsan. Aenean risus elit, aliquam eu lobortis sed, adipiscing eu
        mauris. Pellentesque pulvinar sodales tincidunt. Nam sed tellus in leo
        ullamcorper tincidunt.
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
              <Fragment>
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
              </Fragment>
            );
          }
        }}
      </Query>
    </Container>
  );
};

export default Adventures;

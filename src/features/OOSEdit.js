import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Header, Loader } from 'semantic-ui-react';
import { navigate } from '@reach/router';
import {
  GET_OFFER_OF_SERVICE_BY_OOS_NUMBER,
  OOS_EDIT_QUERY_WITH_ADVENTURE_NAMES,
  UPDATE_OFFER_OF_SERVICE_BY_ID,
} from '../graphql/queries';
import OOSEditForm from '../components/OOSEditForm';

const OOSEdit = ({ oosNumber }) => (
  <Query
    query={OOS_EDIT_QUERY_WITH_ADVENTURE_NAMES}
    variables={{ oosNumber }}
    fetchPolicy="network-only"
  >
    {({ data: { adventures, offerOfService }, loading, error }) => {
      if (loading) return <Loader active />;
      if (error) return <p>Error</p>;

      return (
        <Fragment>
          <Header as="h1">Edit Offer of Service</Header>
          <Mutation
            mutation={UPDATE_OFFER_OF_SERVICE_BY_ID}
            onError={error => {
              console.log('MUTATION ERROR', error);
              debugger;
            }}
            onCompleted={data => {
              navigate(
                `/oos/${data.updateOfferOfService.OfferOfService.oosNumber}`
              );
            }}
            update={(cache, mutationResult) => {
              const cacheData =
                mutationResult.data.updateOfferOfService.OfferOfService;
              cache.writeQuery({
                query: GET_OFFER_OF_SERVICE_BY_OOS_NUMBER,
                data: {
                  offerOfService: cacheData,
                },
              });
            }}
          >
            {(mutation, { data, error }) => {
              return (
                <OOSEditForm
                  adventures={adventures}
                  offerOfService={offerOfService}
                  mutate={mutation}
                />
              );
            }}
          </Mutation>
        </Fragment>
      );
    }}
  </Query>
);

export default OOSEdit;

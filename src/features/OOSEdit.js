import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Header, Loader } from 'semantic-ui-react';
import {
  GET_OFFER_OF_SERVICE_BY_OOS_NUMBER,
  OOS_EDIT_QUERY_WITH_ADVENTURE_NAMES,
  UPDATE_OFFER_OF_SERVICE_BY_ID,
} from '../graphql/queries';
import OOSEditForm from '../components/OOSEditForm';
import DocumentTitle from '../components/DocumentTitle';

const OOSEdit = ({ oosNumber, navigate }) => (
  <Query
    query={OOS_EDIT_QUERY_WITH_ADVENTURE_NAMES}
    variables={{ oosNumber }}
    fetchPolicy="network-only"
  >
    {({ data, loading, error }) => {
      if (loading) return <Loader active />;
      if (error) return <p>Error</p>;

      const { adventures, offerOfService } = data;

      return (
        <DocumentTitle title={`Edit ${offerOfService.fullName}`}>
          <>
            <Header as="h1">Edit Offer of Service</Header>
            <Mutation
              mutation={UPDATE_OFFER_OF_SERVICE_BY_ID}
              onError={error => {
                console.log('MUTATION ERROR', error);
              }}
              onCompleted={data => {
                navigate(`..`);
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
          </>
        </DocumentTitle>
      );
    }}
  </Query>
);

export default OOSEdit;

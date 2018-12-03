import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Header, Loader } from 'semantic-ui-react';
import gql from 'graphql-tag';
import OOSTable from './table';
import { OFFERS_OF_SERVICE_FRAGMENT } from '../../graphql/fragments';

const query = gql`
  query($importId: String) {
    offersOfService(filters: { importId: $importId }) {
      ...OffersOfServiceFragment
    }
  }
  ${OFFERS_OF_SERVICE_FRAGMENT}
`;

class OOSImportReview extends Component {
  static propTypes = {
    importId: PropTypes.string.isRequired,
    defaultSortColumn: PropTypes.string,
  };

  render() {
    const { importId } = this.props;
    return (
      <Query query={query} variables={{ importId }} fetchPolicy="network-only">
        {({ data, loading, error }) => {
          if (loading) return <Loader active />;
          if (error) {
            return <p>Error</p>;
          }

          return (
            <>
              <Header as="h2">Review Import Results and Send Emails</Header>
              <p>
                The table below shows the results of the Offer of Service
                import. <strong>Welcome messages have not yet been sent</strong>
                . Review the results and toggle off any OOS to whom a welcome
                message should not be sent, then click the Send Emails button at
                the bottom of the page.
              </p>
              <OOSTable
                stepUpdater={this.props.stepUpdater}
                data={data.offersOfService}
              />
            </>
          );
        }}
      </Query>
    );
  }
}

export default OOSImportReview;

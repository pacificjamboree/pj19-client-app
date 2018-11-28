import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Loader } from 'semantic-ui-react';
import gql from 'graphql-tag';
import OOSTable from '../OOSTable';
import { OFFERS_OF_SERVICE_FRAGMENT } from '../../graphql/fragments';

const query = gql`
  query($importId: String) {
    offersOfService(filters: { importId: $importId }) {
      ...OffersOfServiceFragment
    }
  }
  ${OFFERS_OF_SERVICE_FRAGMENT}
`;

/*
query($importId:String) {
  offersOfService(filters: { importId: $importId }) {
    ...OffersOfServiceFragment
  }
}

*/
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
          return <OOSTable data={data.offersOfService} />;
        }}
      </Query>
    );
  }
}

export default OOSImportReview;

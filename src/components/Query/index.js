import React from 'react';
import { Query as ApolloQuery } from 'react-apollo';
import { Loader } from 'semantic-ui-react';
import NotFound from '../../features/NotFound';

const Query = ({ children, notFoundIfFalsy, ...props }) => {
  return (
    <ApolloQuery {...props}>
      {({ data, loading, error }) => {
        if (error) {
          console.error(error);
          throw error instanceof Error ? error : new Error(error);
        }

        if (loading || !data) return <Loader active />;

        if (notFoundIfFalsy && !data[notFoundIfFalsy]) {
          return <NotFound />;
        }

        return children({ data });
      }}
    </ApolloQuery>
  );
};

export default Query;

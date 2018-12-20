import React from 'react';
import { Query as ApolloQuery } from 'react-apollo';
import { Loader } from 'semantic-ui-react';
import NotFound from '../../features/NotFound';

const Query = ({ children, notFoundIfFalsy, ...props }) => {
  return (
    <ApolloQuery {...props}>
      {({ data, loading, error }) => {
        if (loading || !data) return <Loader active />;
        if (notFoundIfFalsy && !data[notFoundIfFalsy]) {
          if (error) {
            return (
              <>
                <p>An error occurred</p>
              </>
            );
          }
          return (
            <NotFound>
              <p>
                There is no Offer of Service with OOS Number{' '}
                {props.variables.oosNumber}
              </p>
            </NotFound>
          );
        }

        console.log({ data });

        return children({ data });
      }}
    </ApolloQuery>
  );
};

export default Query;

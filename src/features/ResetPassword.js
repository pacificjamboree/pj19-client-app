import React from 'react';
import { Mutation } from 'react-apollo';
import { Grid, Header, Button } from 'semantic-ui-react';
import { Link } from '@reach/router';
import DocumentTitle from '../components/DocumentTitle';
import { RESET_PASSWORD_MUTATION } from '../graphql/queries';

import ResetPasswordForm from '../components/ResetPasswordForm';

const Wrapper = ({ children }) => (
  <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2">Reset Password</Header>
      {children}
    </Grid.Column>
  </Grid>
);

const ResetPassword = ({ passwordResetToken }) => (
  <DocumentTitle title="Reset Password">
    <Mutation mutation={RESET_PASSWORD_MUTATION}>
      {(mutation, { data, error }) => {
        if (!data && !error) {
          return (
            <Wrapper>
              <ResetPasswordForm
                passwordResetToken={passwordResetToken}
                mutation={mutation}
              />
            </Wrapper>
          );
        }

        if (error || data.resetPassword.status === 'error') {
          return (
            <Wrapper>
              <p>An error occurred while attempting to reset your password.</p>
            </Wrapper>
          );
        }

        if (data.resetPassword.status === 'ok') {
          return (
            <Wrapper>
              <p>Your password has been reset.</p>
              <Link to="/login">
                <Button color="teal" fluid size="large">
                  Log In Now
                </Button>
              </Link>
            </Wrapper>
          );
        }
      }}
    </Mutation>
  </DocumentTitle>
);

export default ResetPassword;

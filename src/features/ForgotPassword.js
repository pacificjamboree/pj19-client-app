import React from 'react';
import { Mutation } from 'react-apollo';
import { Grid, Header } from 'semantic-ui-react';
import { SEND_PASSWORD_RESET_EMAIL_MUTATION } from '../graphql/queries';

import ForgotPasswordForm from '../components/ForgotPasswordForm';

const Wrapper = ({ children }) => (
  <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2">Reset Password</Header>
      {children}
    </Grid.Column>
  </Grid>
);
const ForgotPassword = () => {
  return (
    <Mutation mutation={SEND_PASSWORD_RESET_EMAIL_MUTATION}>
      {(mutation, { data, error }) => {
        if (!data) {
          return (
            <Wrapper>
              <ForgotPasswordForm mutation={mutation} />
            </Wrapper>
          );
        }

        if (error) {
          return (
            <Wrapper>
              <p>An error occurred while attempting to reset your password.</p>
            </Wrapper>
          );
        }

        if (data.sendPasswordResetEmail.status === 'error') {
          return (
            <Wrapper>
              <p>An error occurred while attempting to reset your password.</p>
              <p>{data.sendPasswordResetEmail.error}</p>
            </Wrapper>
          );
        }

        if (data.sendPasswordResetEmail.status === 'ok') {
          return (
            <Wrapper>
              <p>
                A link to reset your password will be emailed to the email
                address you provided.
              </p>
            </Wrapper>
          );
        }
      }}
    </Mutation>
  );
};

export default ForgotPassword;

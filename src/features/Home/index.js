import React from 'react';
import { Image, Header } from 'semantic-ui-react';
import { Redirect } from '@reach/router';
import Query from '../../components/Query';
import climb from './images/climb.jpg';
import { GET_LOGIN_STATE } from '../../graphql/queries';

const Home = () => (
  <Query query={GET_LOGIN_STATE}>
    {({ data }) => {
      if (data.loggedIn) {
        return <Redirect noThrow to="/dashboard" />;
      }
      return (
        <div>
          <Image src={climb} alt="A scout in climbing equipment at PJ 2015" />
          <Header as="h1" textAlign="center">
            Get ready for your PJ Adevnture!
          </Header>
        </div>
      );
    }}
  </Query>
);

export default Home;

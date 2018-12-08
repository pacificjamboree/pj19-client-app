import React from 'react';
import { Image, Header } from 'semantic-ui-react';
import climb from './images/climb.jpg';

const Home = () => (
  <div>
    <Image src={climb} alt="A scout in climbing equipment at PJ 2015" />
    <Header as="h1" textAlign="center">
      Get ready for your PJ Adevnture!
    </Header>
  </div>
);

export default Home;

import React from 'react';
import { Image, Header } from 'semantic-ui-react';
const Home = () => (
  <div>
    <Image src="https://i.imgur.com/TaoXQmv.jpg" alt="Horse" />
    <Header as="h1" textAlign="center">
      Get ready for your PJ Adevnture!
    </Header>
    <img
      style={{ width: '100%', marginTop: '2em' }}
      src="https://react.semantic-ui.com//assets/images/wireframe/paragraph.png"
      alt="text"
    />
    <img
      style={{ width: '100%', marginTop: '2em' }}
      src="https://react.semantic-ui.com//assets/images/wireframe/paragraph.png"
      alt="text"
    />
    <img
      style={{ width: '100%', marginTop: '2em' }}
      src="https://react.semantic-ui.com//assets/images/wireframe/paragraph.png"
      alt="text"
    />
  </div>
);

export default Home;

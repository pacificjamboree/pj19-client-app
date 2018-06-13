import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import Login from './Login';
import Logout from './Logout';
import Adventures from './Adventures';
import LoginLogout from '../components/LoginLogout';
import NavBar from '../components/NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Router>
          <Home path="/" />
          <Login path="/login" />
          <Logout path="/logout" />
          <Adventures path="/adventures" />
        </Router>
      </div>
    );
  }
}

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to PJ 2019 Adventure</p>
  </div>
);

export default App;

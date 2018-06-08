import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import Login from './Login';
import Logout from './Logout';
import Adventures from './Adventures';
import LoginLogout from '../components/LoginLogout';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Pacific Jamboree 2019 • Adventure</h1>
          <Link to="/">Home</Link>
          <br />
          <Link to="/adventures">Adventures</Link>
          <br />
          <LoginLogout />
        </header>

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

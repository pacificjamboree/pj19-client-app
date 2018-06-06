import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Welcome to React!</h1>
        </header>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.{' '}
          <br />
          Using React version {React.version} <br />
          NODE_ENV {process.env.NODE_ENV} <br />
          FOO_BAR {process.env.REACT_APP_FOO_BAR}
        </p>
      </div>
    );
  }
}

export default App;

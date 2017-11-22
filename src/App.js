import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Lights from './Lights';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">A Philips Hue React app</h1>
        </header>
        <Lights />
      </div>
    );
  }
}

export default App;

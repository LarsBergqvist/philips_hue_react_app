import React, { Component } from 'react';
import './App.css';
import LightsView from './LightsView';

class App extends Component {
render() {
   return (
      <div className="App">
         <header className="App-header">
            <h1 className="App-title">A Philips Hue React app</h1>
        </header>
        <LightsView />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import LightsView from './LightsView';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
render() {
   return (
      <MuiThemeProvider>
      <div className="App">
         <header className="App-header">
            <h1 className="App-title">A Philips Hue React app</h1>
        </header>
        <LightsView />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

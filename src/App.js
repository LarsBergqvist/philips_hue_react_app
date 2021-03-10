import React from 'react';
import './App.css';
import LightsView from './LightsView';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">A Philips Hue React app</h1>
            </header>
            <LightsView />
        </div>
    );
}

export default App;

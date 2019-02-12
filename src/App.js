import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';

import routes from './routes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <div>
            <div className="bg-std"/>
            {routes}
          </div>
        </header>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

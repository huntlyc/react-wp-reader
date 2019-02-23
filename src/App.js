import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AppContent } from './AppContent';

export class App extends Component {
  render() {
    return (
      <React.Fragment>
          <header>
              <h1>WP API test</h1>
              <p>Pulls from strutdigital.co.uk</p>
          </header>
          <AppContent/>
          <footer>Made with <span className="heart">&#9829;</span> by <a href="https://www.huntlycameron.co.uk/" rel="nooper" target="_blank">huntlyc</a></footer>
      </React.Fragment>
    );
  }
}

export default App;

import React, { Component } from 'react';
import AddNewCard from './component/AddNewCard';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <AddNewCard />
      </div>
    );
  }
}

const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Just Another Weather App 2</h1>
    </header>
  );
}

export default App;

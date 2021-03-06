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

      <h1 className="App-title"> 
        Just
        <img src={logo} className="App-logo" alt="spinning atomic logo" />
        Another Weather App <span className='animate'>2</span></h1>
    </header>
  );
}

export default App;

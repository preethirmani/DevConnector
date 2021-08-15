
import React, { Component } from 'react';
import './App.css';
import Footer from './Components/Layout/Footer';
import Landing from './Components/Layout/Landing';
import Navbar from './Components/Layout/Navbar';

class App extends Component {

  render() {
    return (
    <div className="App">
      <Navbar />
      <Landing />
      <Footer />
     
    </div>
  );
  }
  
}

export default App;

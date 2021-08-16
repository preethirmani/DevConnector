
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Provider } from 'react-redux';
import './App.css';
import Footer from './Components/Layout/Footer';
import Landing from './Components/Layout/Landing';
import Navbar from './Components/Layout/Navbar';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register'
import store from './store';



class App extends Component {

  render() {
    return (
    
    <Provider store={store} >
      <Router>
        <div className="App">
          <Navbar />   
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Footer />
        </div>
      </Router>
    </Provider>
 
  );
  }
  
}

export default App;

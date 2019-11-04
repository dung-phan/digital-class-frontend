import React, { Component } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Events from './components/Events';

import './App.css';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route path='/' exact component={Home} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/login' exact component={Login} />
          <Route path='/events' exact component={Events} />
        </div>
      </Provider>
    );
  }
}

export default App;

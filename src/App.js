import React, { Component } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Batch from './components/Batch';

import './App.css';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/batches' exact component={Batch} />
        </div>
      </Provider>
    );
  }
}

export default App;

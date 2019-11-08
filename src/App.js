import React, { Component } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Batch from './components/Batch';
import BatchDetails from './components/BatchDetails';
import EvaluationPage from './components/EvaluationPage';
import './App.css';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/batches' exact component={Batch} />
          <Route path='/batches/:id/students' exact component={BatchDetails} />
          <Route
            path='/evaluations/batches/:batchId/students/:id'
            exact
            component={EvaluationPage}
          />
        </div>
      </Provider>
    );
  }
}

export default App;

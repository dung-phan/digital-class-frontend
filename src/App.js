import React, { Component } from "react";
import store from "./store";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Account from "./components/Account";
import Batch from "./components/Batch";
import BatchDetails from "./components/BatchDetails";
import EvaluationPage from "./components/EvaluationPage";
import "./sass/_main.scss";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/account" exact component={Account} />
          <Route path="/batches" exact component={Batch} />
          <Route path="/batches/:id/students" exact component={BatchDetails} />
          <Route
            path="/batches/:batchId/students/:studentId/evaluations"
            exact
            component={EvaluationPage}
          />
        </div>
      </Provider>
    );
  }
}

export default App;

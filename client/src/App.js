import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Boiler

// Redux Dependecies
import { Provider } from "react-redux";
import store from "./store";

// Components

import { login as Login } from "./components/main/login";
import { register as Register } from "./components/main/register";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
        </Router>
      </Provider>
    );
  }
}

export default App;

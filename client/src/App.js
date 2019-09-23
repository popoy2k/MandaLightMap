import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Boiler

// Redux Dependecies
import { Provider } from "react-redux";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faPaw,
  faChild,
  faIndustry,
  faSkullCrossbones,
  faUserInjured,
  faMoneyBillAlt,
  faChartArea
} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Components

// import { login as Login } from "./components/main/login";
import register from "./components/main/register";
import { login as Login } from "./components/main/login";
import { landing as LandingPage } from "./components/main/landing";
// import { SignUp } from "./components/main/SignUp";

library.add(
  fab,
  faPaw,
  faChild,
  faIndustry,
  faSkullCrossbones,
  faUserInjured,
  faMoneyBillAlt,
  faChartArea
);
export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={register} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;

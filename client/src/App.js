import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Boiler

// Redux Dependecies
import { Provider } from "react-redux";
import store from "./store";

// Components

// import { login as Login } from "./components/main/login";
import { register as Register } from "./components/main/register";
import { landing as LandingPage } from "./components/main/landing";

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
          <Route exact path="/" component={LandingPage} />
          <Route path="/register" component={Register} />
        </Router>
      </Provider>
    );
  }
}

export default App;

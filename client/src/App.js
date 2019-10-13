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

import register from "./components/main/register";
import login from "./components/main/login";
import userActivate from "./components/main/userActivate";
import forgetPass from "./components/main/forgetPass";
import resetPass from "./components/main/resetPass";
import landing from "./components/main/landing";
import MandaMap from "./components/map/MandaMap";

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
            <Route exact path="/" component={landing} />
            <Route path="/auth/login" component={login} />
            <Route path="/auth/register" component={register} />
            <Route path="/auth/uact/:token" component={userActivate} />
            <Route path="/auth/ures/:token" component={resetPass} />
            <Route path="/auth/ufor/" component={forgetPass} />
            <Route path="/map" component={MandaMap} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;

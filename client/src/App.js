import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Boiler

// Functions
// import { getMainMap } from "./actions/auth";

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
import "antd/dist/antd.css";
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
import userIndex from "./components/home/userIndex";
import adminIndex from "./components/home/adminIndex";
import intro from "./components/related/intro";
import introTopoJSON from "./components/related/introTopo";
import QgisPlotting from "./components/related/QgisPlotting";
import RasterPostgres from "./components/related/RasterPostgre";

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
  componentDidMount() {}

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
            <Route path="/home/user" component={userIndex} />
            <Route path="/home/admin" component={adminIndex} />
            <Route path="/related/introduction" component={intro} />
            <Route path="/related/GIS/introtopo/61" component={introTopoJSON} />
            <Route
              path="/related/GIS/qgisplotting/62"
              component={QgisPlotting}
            />
            <Route
              path="/related/GIS/postgresloadraster/63"
              component={RasterPostgres}
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;

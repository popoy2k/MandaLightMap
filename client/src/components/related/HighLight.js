import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

import HL2 from "./HL2.gif";

export class HighLight extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">High Light Temperature</span>
            <p>
              Most plants tolerate normal temperature fluctuations. In general,
              foliage plants grow best between 70 degrees and 80 degrees F.
              during the day and between 60 degrees to 68 degrees F. at night.
              Most flowering plants prefer the same daytime temperature range,
              but grow best when nighttime temperatures range from 55 degrees to
              60 degrees F. Lower nighttime temperatures help the plant: recover
              from moisture loss, intensify flower color and prolong flower
              life. Excessively low or high temperatures may cause: plant
              stress, inhibit growth, or promote a spindly appearance and
              foliage damage or drop. Cool nighttime temperatures are actually
              more desirable for plant growth than high temperatures. A good
              rule of thumb is to keep nighttime temperatures 10 to 15 degrees
              lower than daytime temperatures.
            </p>
            <div className="article-image">
              <img src={HL2} alt="High Light Temp" />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default HighLight;

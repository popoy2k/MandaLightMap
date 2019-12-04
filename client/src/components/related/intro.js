import React, { Component, Fragment } from "react";
import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";
export class intro extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">Introduction</span>
            <p>
              The world today as we know it, has gone through many changes.
              Innovation, development and technology had curbed our world with
              these changes. As we progress, we humans had made alterations to
              our time by working day and night. People nowadays have been
              living under the nighttime glow of artificial light. This had
              caused problems to humans, animals and to our environment. The
              light pollution that we are experiencing today will be monitored
              and spread to public awareness.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default intro;

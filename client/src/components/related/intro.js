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
              these changes. One of the biggest revolution we had is the
              invention of the light bulb 150years ago was one of the most
              transformative milestones in the history. This new form of light,
              artificial light, brightened and made safe once-darkened streets
              prolonged waking hours into the evening and provide electricity to
              home for the very first time. Today, this glow has grown but at a
              cost. Light Pollution is the adverse effect of artificial light
              including sky glow, glare, light trespass, light clutter,
              decreased visibility at night, and energy waste. It is caused by
              the abundance of light sources, emitting light outside of its
              intended direction. Light pollution is not only a hinderance to
              astronomy, but it also impacts us directly. No matter what form
              light pollution takes, each can have unintended yet harmful
              impacts. Wildlife have had their nocturnal patterns disrupted.
              Human's wellbeing is also compromised by this light pollution. The
              excess light can overwhelm photoreceptor cells in the retina,
              damaging ones eyesight. Plus, it disrupts natural sleep cycles and
              causes sleep deprivation leading to a number of health problems
              possibly including cancer.
              <br />
              <br />
              Light pollution had grown to a problem that should be in the
              discussion for the next coming years. Skotós is created to monitor
              and inform the public about light pollution in the District I of
              Mandaluyong City, Philippines in an attempt to fight against it.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default intro;

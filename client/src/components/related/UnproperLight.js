import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

import UnproperImg from "./unproperimg.png";

export class UnproperLight extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">Unproper Lighting</span>
            <p>
              Proper lighting is important because it makes all tasks easier.
              When lighting levels are low, too high, our ability to complete
              tasks safely is compromised. This is because our eyes get tired
              and/or sore, which can lead to headaches and work mistakes.
              Unproper lighting it can’t make it difficult to make appropriate
              judgements regarding footing, placement of materials, and timing
              when moving materials, tools, or equipment is being used. And
              Unproper Lighting can cause our health became bad , like in seeing
              of materials if the light is high we can’t identify if it the
              right place. Unproper Lighting can cause also eye blinded by
              infections of the cornea or retina by the unproper lighting.
            </p>
            <p>
              Common health effects associated with poor lighting include:
              <ul>
                <li>Headache and eyestrain</li>
                <li>
                  Neck, back, and shoulder strain (when straining to see items
                  because of poor lighting)
                </li>
                <li>Falling, tripping, slipping</li>
                <li>Dropping materials or tools</li>
                <li>
                  Depression (in the case of insufficient or gloomy lighting)
                </li>
              </ul>
            </p>

            <div className="article-image">
              <img src={UnproperImg} alt="Unproper" />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UnproperLight;

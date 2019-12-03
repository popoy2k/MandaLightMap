import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

import HighTemp from "./hightempimg.png";
import HighTempScale from "./HighTempScale.png";

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
            <div className="article-image">
              <img src={HighTemp} alt="High Temp" />
            </div>
            <p>
              There are types of light temperature like soft white temperature
              (2700K – 3000K) , bright white/cool white temperature (3500K –
              4100K) and daylight (5000K – 6500K). the higher the temperature
              the higher cause of bad health and high consume of energy.
              Although our eyes have adjusted to the Soft White color
              temperature of incandescent bulbs over the years, this doesn't
              mean that they are necessarily the best option for all lighting
              applications. For example, because of their warmer color
              temperature, these soft white lights often pull warmer colors from
              a room (reds, oranges, etc.), altering the contrasts throughout
              the space. With that in mind, here are some tips on how to light
              the different rooms in your home most effectively.
            </p>
            <div className="article-image">
              <img src={HighTempScale} alt="High Temp Scale" />
            </div>
            <p>
              High light is the presence of lighting intensity higher than that
              which is appropriate for a specific activity. Since then, however,
              the interior design community has begun to reconsider this
              practice. High light temperature encompasses two separate
              concerns:
              <ul>
                <li>
                  Unnecessary electric lighting is expensive and
                  energy-intensive. Lighting accounts for approximately 9% of
                  residential electricity use as of 2001 and about 40% of
                  commercial electricity use.{" "}
                </li>
                <li>
                  Excessive levels of artificial light may adversely affect
                  health. These detrimental effects may depend on the spectrum
                  as well as the overall brightness level of light.
                </li>
              </ul>
              High light temperature can be reduced by installing occupancy
              sensors, using natural sunlight whenever possible, turning off
              lights when leaving a room, or changing the type of lightbulb.
              Over illumination does not refer to snow blindness, where high
              exposure to ultraviolet light causes physical damage to the eye.
              Too little light, the opposite of over illumination, is associated
              with seasonal affective disorder.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default HighLight;

import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

import IL1 from "./IL1.jpg";

export class UnproperLight extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">Improper Lighting</span>
            <p>
              <h4>7 Tips to prevent Improper Lighting / Light Pollution</h4>
              Luminous pollution, unlike other forms of contamination and waste,
              can be contained and/or reduced by improving outdoor lighting
              practices. Remember that outdoor lighting serves a purpose - to
              provide visibility and safety at night, but lighting that exceeds
              its purpose can quickly become offensive to others. Here are some
              simple tips to help you reduce light pollution without sacrificing
              your comfort or safety.
              <br />
              <br />
              <ol>
                <li>
                  <h6>Warm It Up</h6> Use{" "}
                  <a
                    href="https://www.delmarfans.com/light-bulbs/fluorescent/"
                    className="sk-custom-link"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    compact fluorescent lamps
                  </a>{" "}
                  (CFL) and LED bulbs that produce warm white lighting. Many LED
                  lights emit a blue short wavelength light that scatters easily
                  into the atmosphere, which causes eyestrain, impairs night
                  vision and adds to light pollution.
                  <br />
                </li>
                <li>
                  <h6>Shield It</h6>Choose{" "}
                  <a
                    href="https://www.delmarfans.com/lighting/outdoor/"
                    className="sk-custom-link"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    outdoor light fixtures
                  </a>{" "}
                  that are shielded, meaning there is a solid cap above the
                  light bulb that prevents light from being emitted directly to
                  the sky, to minimize sky pollution. You can shield exiting
                  fixtures by buying and installing reasonably priced shades.
                  <br />
                </li>
                <li>
                  <h6>Cut It Off</h6>Select exterior light fixtures with cutoff
                  angles to prevent light from escaping above the horizontal
                  plane (nadir), minimize uplighting, and reduce high-angle
                  brightness. Cutoff lighting emits illumination down to the
                  ground where it's most needed and in many cases, improves
                  visibility. The Illuminating Engineering Society of North
                  America (IESNA) provides the following cutoff classifications:
                  <ul>
                    <li>
                      <span className="sk-strong">Full Cutoff</span> - No light
                      is distributed at or above an angle of 90 degrees from the
                      nadir. Candela per 1000 lamp Lumens does not numerically
                      exceed 100 (10 percent) at a vertical angle of 80 degrees
                      from the nadir. This applies to all lateral angles{" "}
                    </li>
                    <li>
                      <span className="sk-strong">Cutoff</span> - Cutoff light
                      fixtures allow a small amount of uplighting. Candela per
                      1000 lamp Lumens does not numerically exceed 25 (2.5
                      percent) at a vertical angle of 90 degrees from the nadir.
                      Candela per 1000 lamp Lumens does not numerically exceed
                      100 (10 percent) at an angle of 80 degrees from the nadir.
                      This applies to all lateral angles around the light
                      source.
                    </li>
                    <li>
                      <span className="sk-strong">Semi-Cutoff</span> -
                      Semicutoff light fixtures emit more light directly into
                      the sky and provide little control at the property line.
                      Candela per 1000 lamp Lumens does not numerically exceed
                      50(5 percent) at an angle of 90 degrees from the nadir.
                      Candela per 1000 lamp Lumens does not numerically exceed
                      200 (20 percent) at an angle of 80 degrees above nadir.
                      This applies to all lateral angles around the light
                      source.
                    </li>
                    <li>
                      <span className="sk-strong">Non-Cutoff</span> - Noncutoff
                      light fixtures distribute light without Candela limitation
                      in the zone above the max Candela.
                      <div className="article-img">
                        <img src={IL1} alt="Improper Light" />
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  <h6>Sensor It</h6>Install motion sensors on outdoor fixtures
                  so they turn on when needed and turn off after a short time.
                  Make sure to test and adjust the motion detector's sensitivity
                  as needed to prevent the lights from turning on and off
                  unnecessarily.
                </li>
                <li>
                  <h6>Get Certified</h6>Use IDA certified{" "}
                  <a
                    href="https://www.delmarfans.com/lighting/outdoor/dark-sky/"
                    className="sk-custom-link"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Dark Sky Lighting
                  </a>
                  , which is designed to minimize glare, light spill, and sky
                  glow. Dark-sky approved light fixtures are available in a
                  variety of chandeliers, flush mounts, pendants, and wall
                  sconces. If you live near the beach, use certified Turtle Safe
                  Lighting. These shielded light fixtures produce a long
                  wavelength light, which does not scatter easily, and should be
                  mounted low to avoid high-angle brightness.
                </li>
                <li>
                  <h6>Turn It Off</h6>Turn off any unnecessary outdoor lights
                  when you are home for the night or before going to bed to
                  prevent wasteful dusk to dawn lighting. If you're in doubt,
                  turn them off by 11 PM. While you're at it, make sure to turn
                  off indoor light fixtures, like{" "}
                  <a
                    href="https://www.delmarfans.com/lighting/wall/"
                    className="sk-custom-link"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    wall lights
                  </a>
                  , when you're not home or before bed to reduce energy
                  consumption.
                </li>
                <li>
                  <h6>Be Involved</h6>Take steps to prevent and reduce light
                  pollution in your home, work, and community. Close the blinds
                  and curtains to prevent light spill. Ask management to turn
                  off or dim office lights after all workers have left the
                  property for the day to prevent light and energy waste.
                  Petition local business owners to dim after-hour signs to
                  prevent glare and light clutter. Propose lighting ordinances
                  to your local and state governments to reduce light pollution.
                </li>
              </ol>
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UnproperLight;

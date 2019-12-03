import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

import SG1 from "./SG1.jpg";

export class SkyGlow extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">Sky Glow</span>
            <p>
              <span className="sk-strong">Sky Glow</span> occurs from both
              natural and human-made sources. The natural component of sky glow
              has five sources: sunlight reflected off the moon and earth, faint
              air glow in the upper atmosphere (a permanent, low-grade aurora),
              sunlight reflected off interplanetary dust (zodiacal light),
              starlight scattered in the atmosphere, and background light from
              faint, unresolved stars and nebulae (celestial objects or diffuse
              masses of interstellar dust and gas that appear as hazy smudges of
              light). Natural sky glow is well quantified. In this publication,
              further discussion of sky glow considers only human-made sources.
            </p>
            <p>
              Electric lighting also increases night sky brightness and is the
              human-made source of sky glow. Light that is either emitted
              directly upward by luminaires or reflected from the ground is
              scattered by dust and gas molecules in the atmosphere, producing a
              luminous background. It has the effect of reducing one’s ability
              to view the stars, as seen in Figure. Sky glow is highly variable
              depending on immediate weather conditions, quantity of dust and
              gas in the atmosphere, amount of light directed skyward, and the
              direction from which it is viewed. In poor weather conditions,
              more particles are present in the atmosphere to scatter the
              upward-bound light, so sky glow becomes a very visible effect of
              wasted light and wasted energy.
            </p>
            <div className="article-image">
              <img src={SG1} alt="Sky Glow" />
            </div>
            <p>
              <span className="sk-strong">Sky Glow</span> glow is of most
              concern to astronomers because it reduces their ability to view
              celestial objects. Sky glow increases the brightness of the dark
              areas of the sky, which reduces the contrast of stars or other
              celestial objects against the dark sky background. Astronomers
              typically like very dry clear dark nights for observing. A typical
              suburban sky is 5 to 10 times brighter at the{" "}
              <a
                href="https://www.lrc.rpi.edu/programs/nlpip/lightinganswers/lightpollution/skyGlow.asp"
                rel="noopener noreferrer"
                target="_blank"
                className="sk-custom-link"
              >
                zenith
              </a>{" "}
              than the natural sky (the zenith is the angle that points directly
              upward, or 180°, from the observation point). In city centers, the
              zenith may be 25 or 50 times brighter than the natural background.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SkyGlow;

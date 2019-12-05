import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

import SEC1 from "./SEC1.png";
import SEC2 from "./SEC2.png";
import SEC3 from "./SEC3.png";

export class SecIntegrity extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">
              Excessive Light can Cause Security Integrity
            </span>
            <p>
              In fact, most property crime occurs in the light of the day. And
              some crimes like vandalism and graffiti actually thrive on night
              lighting. <br />
              <br />
              A dark sky does not necessarily mean a dark ground. Smart lighting
              that directs light where it is needed creates a balance between
              safety and starlight. <br />
              <br /> Outdoor lighting is intended to enhance safety and security
              at night, but too much lighting can actually have the opposite
              effect. Visibility should always be the goal. Glare from bright,
              unshielded lights actually decreases safety because it shines into
              our eyes and constricts our pupils. This can not only be blinding,
              it also makes it more difficult for our eyes to adjust to
              low-light conditions.
            </p>
            <div className="article-image">
              <img src={SEC1} alt="Sec1" />
            </div>
            <div className="article-image">
              <img src={SEC2} alt="Sec2" />
            </div>
            <div className="article-image">
              <img src={SEC3} alt="Sec3" />
            </div>
            <p>
              <h4>Explanation:</h4>
              In unshielded light my not appreciate the glare from floodlights ,
              Aim them down to at least 45 degrees and shield them , and my not
              be happier and so will the environment and night sky. Unshielded
              light my waste of energy , waste of money , annoying to the people
              crosses by. <br />
              <br />
              And another way around , Full Cutoff Sports Lighting increases the
              level of useable light on the playing area while addressing light
              impact concerns such as glare reduction, light spillage and sky
              glow. Full cutoff lighting systems utilize a recessed lamp in a
              fixture housing that is parallel with the playing surface. This
              design increases playing area illumination, reduces glare and
              light spillage in surrounding areas and eliminates upward light
              and sky glow.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SecIntegrity;

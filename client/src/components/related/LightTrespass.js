import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

import LT1 from "./LT1.png";
import LT2 from "./LT2.png";

export class LightTrespass extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">Light Trespass</span>
            <p>
              Light pollution is an unwanted consequence of outdoor lighting and
              includes such effects as sky glow, light trespass, and glare. An
              illustration of both useful light and the components of light
              pollution are illustrated in Figure 1. Sky glow is a brightening
              of the sky caused by both natural and human-made factors. The key
              factor of sky glow that contributes to light pollution is outdoor
              lighting.
            </p>
            <div className="article-image">
              <img src={LT1} alt="Light Trespass 1" />
            </div>
            <p>
              {" "}
              <span className="sk-strong">Light Trespass</span> It is an
              undesirable condition in which exterior light. Light trespass is
              light being cast where it is not wanted or needed, such as light
              from a streetlight or a floodlight that illuminates a neighbor’s
              bedroom at night making it difficult to sleep. Light trespass is
              unwanted light intruding onto a person’s property or area of
              concern. This home in Calgary is suffering greatly from light
              trespass from the streetlights located near this corner.{" "}
            </p>
            <div className="article-image">
              <img src={LT2} alt="Light Trespass 2" />
            </div>
            <p>
              These cobra-head lights scatter much of their light not only over
              the intersection, but the adjacent properties as well. This
              trespass may create problems for the occupants who must sleep with
              the intrusion of this high degree of unwanted light at night.
            </p>
            <p>
              Most of us are familiar with noise trespass, such as the extra
              loud sound of our neighbor’s stereo or car stereo. The continual
              thump-thump of the bass or the wailing of high frequencies has
              incited more than one individual to take the law into his/her own
              hands and attempt to alleviate the unwanted sounds. The same
              situation applies to light trespass. We may have neighbors who
              have very bright yard lights which are often on and shine directly
              into our living rooms or bedrooms and keep us awake at night.
              Streetlights, as in the photo above, are the most common source of
              light trespass. The assumption is made that people want lots of
              light in their neighborhoods in order to combat crime. However,
              research shows that increased light does not combat crime, but may
              actually encourage it. High levels of lighting only serves to give
              residents a false sense of security.
            </p>
            <p>
              Researchers note that when ‘security’ lights on buildings have
              been shut off, vandalism has ceased. Vandals or criminals also
              require light to see what they are doing and to detect any
              security that is in place, such as security guards, cameras or
              dogs. When they cannot see what they are targeting or what they
              are doing, they are discouraged from vandalism or crime. Humans
              require dark conditions in order to sleep properly and maintain
              their circadian rhythms. These vital rhythms are responsible for
              ensuring that the person’s health is maintained.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default LightTrespass;

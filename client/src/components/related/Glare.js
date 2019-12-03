import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

import Glare1 from "./Glare1.png";

export class Glare extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">Glare</span>
            <p>
              {" "}
              <span className="sk-strong">Glare</span> is an immediate
              occurrence and arises from light sources or luminaires whose
              luminance is greater than the eye can adapt to. It can also become
              noticeable after a period of timeGlare can be thought of as
              objectionable brightness. It can be disabling or discomforting.
              Glare is a visual sensation caused by excessive and uncontrolled
              brightness. It can be disabling or simply uncomfortable. It is
              subjective, and sensitivity to glare can vary widely. Older people
              are usually more sensitive to glare due to the aging
              characteristics of the eye. Disability glare is the reduction in
              visibility caused by intense light sources in the field of view,
              while discomfort glare is the sensation of annoyance or even pain
              induced by overly bright sources . Compare the glare from the
              streetlight shown in figure below to the glare from the luminaires
              shown below. Reducing glare is an effective way to improve the
              lighting.
            </p>
            <div className="article-image">
              <img src={Glare1} alt="Glare" />
            </div>
            <p>
              The degree of discomfort glare depends on several factors; the
              luminance and the size of the glare source, the position of the
              glare source in relation to the line of sight and the background
              luminance against which the glare source is viewed.
              <br />
              <br />
              Consequently, when light planning the luminaire’s luminance should
              always be considered in relation to the background luminance. The
              closer the dazzling surface is to the eye, the greater the risk of
              discomfort glare.
              <br />
              <br />
              In open luminaires, especially those for compact and other intense
              light sources with high luminous flux, it is generally the light
              source itself or a mirror image in the specular reflector that
              causes the glare effect. One way to reduce discomfort glare is to
              use satin matt reflectors and luminaires with a larger surface
              area.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Glare;

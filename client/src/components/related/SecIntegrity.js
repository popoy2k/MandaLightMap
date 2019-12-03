import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

import Sec1 from "./SecImg1.png";
import Sec2 from "./SecImg2.png";

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
              Light excessive in our living spaces , we are wasting energy and
              consequently paying more of our electrical bills. Light pollution
              is accountable for releasing of millions of tons of Carbon dioxide
              and waste millions of dollars in the earth.
            </p>
            <div className="article-image">
              <img src={Sec1} alt="Security 1" />
            </div>
            <p>
              And in the field of astronomy is also affected because of light
              pollution.
              <ul>
                <li>
                  Skyglow, caused by light scattering in the atmosphere, tends
                  to reduce the contrast of the night sky which makes it harder
                  for astronomers to view the heavenly bodies.
                </li>
                <li>
                  Light trespass may create disturbance in observations when it
                  enters the telescope.
                </li>
              </ul>
            </p>
            <div className="article-image">
              <img src={Sec2} alt="Security 2" />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SecIntegrity;

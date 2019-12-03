import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

export class BreastCancer extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">Breast Cancer</span>
            <p>
              Several studies over the last decade have suggested that the
              modern practice of keeping our bodies exposed to artificial light
              at night, or LAN, increases cancer risk, especially for cancers
              (such as breast and prostate cancers) that require hormones to
              grow. Women who work night shifts have shown higher rates of
              breast cancer,1 whereas blind women, who are not likely to be
              exposed to or perceive LAN, have shown decreased risks.2 In 2007,
              the International Agency for Cancer Research declared shiftwork a
              probable human carcinogen.3 Now a large study of 164 countries
              adds another piece of evidence, implicating overall light
              pollution. <br /> <br /> The study, conducted by University of
              Connecticut epidemiologist Richard Stevens and colleagues at the
              University of Haifa, showed that higher population-weighted
              country-level LAN levels were associated with higher incidence of
              breast cancer.4 A sensitivity test indicated a 30–50% increased
              risk of breast cancer in countries with the highest versus lowest
              LAN levels. No such association was found between LAN and
              incidence of non-hormone-dependent lung, colorectal, larynx, or
              liver cancers in women. <br /> <br /> “We took the top-level view
              and said, ‘If there really is causation going on, LAN levels
              worldwide should correlate well with breast cancer incidence,’”
              Stevens says. “This is a necessary but not sufficient condition
              for a potentially large effect. If we had seen no relationship
              between country LAN level and breast cancer risk, that would have
              been good evidence against a large effect of LAN on breast cancer
              risk.” <br /> <br /> Tulane University cancer biologist David
              Blask points out the implications go beyond shiftwork. “This study
              suggests that all of us who live in industrialized society have
              the potential to have our circadian system disrupted by too much
              light at night, and this risk is potentially not restricted to a
              smaller percentage of the population that is exposed because of
              their occupation,” Blask says. <br /> <br /> Harvard
              epidemiologist Eva Schernhammer agrees that the positive result
              from this study adds more evidence to the idea that LAN exposure
              contributes to breast cancer risk. But as an ecological study,
              even if the result had been negative, it would not be strong
              enough to rule out evidence from prior case–control studies, she
              says. <br /> <br /> The study authors point out that because of
              the ecological nature of the study, it did not control for
              behavior that would reduce individuals’ exposure to LAN, such as
              sleeping. If people are actually asleep, then little to no light
              would reach their retinas, Stevens says, adding, “Three of four
              good prospective studies have reported a lower risk of breast
              cancer in women who report a long sleep duration.” Stevens thinks
              of reported sleep duration as a surrogate for time spent in the
              dark. But people do wake in the middle of the night, he points
              out, and even brief periods of open eyes during the night could
              expose the retina to LAN. <br /> <br /> The new study highlights
              the need to understand the mechanisms behind the association
              between cancer and LAN, which aren’t clear, Stevens says.
              Previously, Blask and colleagues famously showed that a key factor
              in the connection is melatonin, a hormone produced in nighttime
              darkness that promotes sleep.7 They showed that growth and
              metabolism of human breast cancers growing in rats slowed when the
              tumors were perfused with melatonin-rich human blood collected
              during the night. In contrast, growth and metabolism were
              unchanged in tumors perfused with blood in which melatonin levels
              had been suppressed because of even a brief LAN exposure. Using
              the same model, Blask and George Brainard of Thomas Jefferson
              University have begun conducting pilot studies of the effects of
              melatonin and LAN on human prostate cancer.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default BreastCancer;

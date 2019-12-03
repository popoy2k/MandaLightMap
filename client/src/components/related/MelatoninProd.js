import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

export class MelatoninProd extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">Melatonin Production</span>
            <p>
              Every now and again we hear news about light pollution. Usually,
              that story talks about how too many lights on at night is
              affecting our view of the night sky and how we can’t see the stars
              or the Milky Way and that’s just a shame. Which is all true but
              there are larger concerns. Unsurprisingly, recent studies have
              shown that the amount of light pollution is increasing as years go
              by. More and more cities and towns across the world are lighting
              up their streets, parking lots, buildings, and homes with lights
              that stay on all night.
            </p>
            <p>
              <h4>How does this affect human beings?</h4> <br /> The health of
              humans is also affected by light pollution in negative ways. Being
              exposed to a lot of light at night reduces the body’s production
              of melatonin. A chemical that has antioxidant properties, helps
              induce sleep, boosts the immune system, and lowers cholesterol.
            </p>
            <p>
              <span className="sk-strong">Melatonin Production</span>, The
              production and release of melatonin in the pineal gland occurs in
              the brain's pineal gland, is often known as the "sleep hormone" or
              the "darkness hormone." with a clear daily (circadian) rhythm,
              with peak levels occurring at night. Once produced, it is secreted
              into the blood stream and cerebrospinal fluid (the fluid around
              the brain & spinal cord) and conveys signals to distant organs.
              Melatonin is carried by the circulation from the brain to all
              areas of the body. Tissues expressing proteins called receptors
              specific for melatonin are able to detect the peak in circulating
              melatonin at night and this signals to the body that it is
              night-time. Night-time levels of melatonin are at least 10-fold
              higher than daytime concentrations. Melatonin influences sleep by
              sending a signal to the brain that it is time to rest. This signal
              helps initiate the body's physiological preparations to sleep,
              muscles begin to relax, feelings of drowsiness increase and body
              temperature drops. Melatonin levels naturally rise during the
              early evening as darkness falls and continue to climb throughout
              most of the night, before peaking at approximately 3 a.m. Levels
              of melatonin then fall during the early morning and remain low
              during much of the day. Evening light exposure inhibits the
              naturally timed rise of melatonin, which delays the onset of the
              body's transition to sleep and sleep itself. <br /> <br /> In many
              animals (including a wide range of mammals and birds), melatonin
              from the pineal gland is essential for the regulation of the
              body’s seasonal biology (e.g. reproduction, behavior and coat
              growth) in response to changing day length. The importance of
              pineal melatonin in human biology is not clear, although it may
              help to synchronise circadian rhythms in different parts of the
              body. <br /> <br /> In humans, nocturnal levels of melatonin
              decrease across puberty. The level of circulating melatonin can be
              detected in samples of blood and saliva, and this is used in
              clinical research to identify internal circadian rhythms.
              <br /> <br />
              In addition to its production in the body, melatonin can also be
              taken in capsule form. The clinical uses of melatonin include
              treatment of age-associated insomnia, jet lag, and shift work.
              When administered at an appropriate time of day, it can reset the
              body’s circadian rhythms (see the articles on jet lag and
              circadian rhythm sleep disorders). This resetting effect of
              melatonin has been reported for many dose strengths, including
              those that are equivalent to the concentration of melatonin
              naturally produced by the pineal gland. Higher doses of melatonin
              can reset circadian rhythms, bring on sleepiness and lower core
              body temperature.
              <br /> <br />
              Most of the research into the function of the pineal gland
              involves the human brain's responses to melatonin rhythms. The
              evidence supports two roles for melatonin in humans: the
              involvement of nocturnal melatonin secretion in initiating and
              maintaining sleep, and control by the day/night melatonin rhythm
              of the timing of other 24-hour rhythms.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MelatoninProd;

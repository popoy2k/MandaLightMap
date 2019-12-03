import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

export class CircadianRhythm extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">
              Disruption of Circadian Rhythm
            </span>
            <p>
              Recent research shows that those who live in denser areas tend to
              get more exposure to bright street lights, which can cause them to
              get about 30 minutes less of sleep each night. Melatonin
              suppression is a marker of disruption of our circadian rhythms.{" "}
              <br /> <br /> Sufferers of advanced sleep phase disorder have an
              ‘early’ circadian clock; they feel sleepy and want to go bed in
              the early evening (6 p.m. to 9 p.m.) and wake up in the early
              hours of the morning (2 a.m. to 5 a.m.). Consequently, they may
              have been awake several hours before they go to work and may not
              perform well or be alert. They will also feel sleepy in the late
              afternoon/early evening, which can affect their social lives.{" "}
              <br /> <br /> In contrast, sufferers of delayed sleep phase
              disorder have a ‘late’ circadian clock; they are unable to fall
              asleep until the early hours of the morning (4 a.m. to 6 a.m.) and
              consequently will not awake until approximately midday. This
              disorder can make it difficult for the individual to get to work
              or college on time and if they are able to wake up in time, they
              will probably not have had enough sleep and so will not be alert
              or perform well. This can lead to growing fatigue. Sufferers of
              non-24-hour sleep/wake syndrome do not have a continuous bout of
              sleep each night but, instead, have several short naps across the
              day and night.
              <br /> <br />
              Individuals with ‘free-running’ sleep patterns will experience a
              gradual drift each day in the time that they go to bed and wake
              up. This happens because our circadian clock does not run at
              exactly 24 hours. It runs at slightly more or slightly less, and
              environmental light signals at certain times of day are essential
              to fix it to running at 24 hours. In certain situations, these
              light signals may not be received or understood and so the
              circadian clock runs at its own speed. In individuals with clocks
              longer than 24 hours, this means that they will go to bed and get
              up progressively later each day and will become unsynchronized to
              local time. <br /> <br /> There are three main causes of circadian
              rhythm sleep disorders – genetics, the environment and a medical
              condition. Advanced sleep phase disorder and delayed sleep phase
              disorder have been associated with specific forms of certain genes
              in some individuals. <br /> <br /> The environment or situation a
              person finds themselves in can cause temporary circadian-related
              sleep disorders, for example, jet lag. Night shift workers can
              also struggle to properly adapt to their altered schedule of
              sleeping during the day as they often try to maintain daytime
              family and social commitments as well as their shift work pattern.
              This causes their body clock to be permanently misaligned with
              their desired sleep patterns. <br /> <br /> Certain medical
              conditions are also associated with disrupted sleep patterns. For
              example, many blind people with no light perception suffer from
              free-running sleep patterns as the body clock does not perceive
              any environmental light signals and so the clock drifts at its own
              speed. As the tendency to sleep drifts across the 24-hour day,
              this can mean individuals are awake at night and sleepy during the
              day, which can be problematic for going to work or school.{" "}
            </p>
            <p>
              <h4>
                Ways to reduce circadian disruption resulting from LAN exposure
              </h4>{" "}
              <br />{" "}
              <ul>
                <li>
                  Consider extending the dark period at night to 9 or 10 hours.
                  Install room-darkening shades in bedrooms.
                </li>
                <li>
                  Avoid even brief light exposures. Turn off the lights,
                  television, and computer in the bedroom when you are sleeping.
                  Avoid watching television or working on the computer right
                  before you shut your eyes.
                </li>
                <li>
                  {" "}
                  If you get up in the night, forgo the usual bathroom lights
                  for a dim red nightlight. Red light suppresses melatonin
                  production less than other wavelengths.
                </li>
                <li>
                  Do not take melatonin tablets unless directed by a physician.
                  The spike in circulating melatonin may actually worsen, not
                  alleviate, circadian disruption.
                </li>
              </ul>{" "}
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CircadianRhythm;

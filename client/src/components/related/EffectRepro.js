import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

export class EffectRepro extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">Effects in Reproduction</span>
            <p>
              More than 130 different species of coral on the Great Barrier Reef
              spawn new life by moonlight. Every October or November after the
              full moon, the reefs spew sperm and eggs into the ocean in what
              looks like an underwater blizzard. When the two sex cells combine
              amid the flurry, fertilization begins. Bright urban lights can
              mask the moon’s phases, throwing the{" "}
              <a
                href="http://elifesciences.org/content/4/e09991v1"
                className="sk-custom-link"
                rel="noopener noreferrer"
                target="_blank"
              >
                corals’ biological clocks out of sync
              </a>
              , according to{" "}
              <a
                href="http://www.levy-marinelab.com/"
                className="sk-custom-link"
                rel="noopener noreferrer"
                target="_blank"
              >
                Oren Levy
              </a>
              , of{" "}
              <a
                href="http://life-sciences.biu.ac.il/en/node/707"
                className="sk-custom-link"
                rel="noopener noreferrer"
                target="_blank"
              >
                {" "}
                Bar-Ilan University in Israel
              </a>
              . This can cause the reefs to release their reproductive cells
              late or not at all, thwarting their chances of producing offspring{" "}
              <br />
              <br />
              Sea turtles provide one example of how artificial light on beaches
              can disrupt behavior. Many species of sea turtles lay their eggs
              on beaches, with females returning for decades to the beaches
              where they were born to nest. When these beaches are brightly lit
              at night, females may be discouraged from nesting in them; they
              can also be disoriented by lights and wander onto nearby roadways,
              where they risk being struck by vehicles. At night, beachfront
              lights can heighten this already herculean undertaking. Sea
              turtles are drawn to light, and when they emerge from their
              eggshells they seek out the lowest, shiniest light on the horizon,
              according to{" "}
              <a
                href="http://geointerest.frih.org/index.html"
                className="sk-custom-link"
                rel="noopener noreferrer"
                target="_blank"
              >
                {" "}
                Gregg Verutes
              </a>
              , a geographer from Stanford University who has built software to
              help building developers understand the
              <a
                href="http://www.sciencedirect.com/science/article/pii/S2351989414000274"
                className="sk-custom-link"
                rel="noopener noreferrer"
                target="_blank"
              >
                {" "}
                effects of light pollution
              </a>{" "}
              and other environmental influences. For the turtles, the moon’s
              reflection on the ocean waves normally attracts the tiny
              travelers, but in some cases, bright boardwalk resorts can draw
              them in the wrong direction. As a result, the hatchlings can
              become more vulnerable to hungry predators, dehydration and
              exhaustion.
              <br />
              <br />
              Moreover, sea turtle hatchlings normally navigate toward the sea
              by orienting away from the elevated, dark silhouette of the
              landward horizon, according to a study published by Michael Salmon
              of Florida Atlantic University and colleagues in volume 122,
              number 1–2 (1992) of Behaviour. When there are artificial bright
              lights on the beach, newly hatched turtles become disoriented and
              navigate toward the artificial light source, never finding the
              sea.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EffectRepro;

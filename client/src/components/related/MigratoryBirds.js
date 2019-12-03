import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";
export class MigratoryBirds extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">
              Effects of Artificial Light At Night (ALAN) in Migratory Birds
            </span>
            <p>
              Research on turtles, birds, reptiles, fish, insects and other
              species shows that light pollution can alter behaviours, foraging
              areas, and breeding cycles, and not just in urban center’s but in
              rural areas as well.
            </p>
            <p>
              <span className="sk-strong">Migratory bird</span> species perform
              seasonal movements between stationary breeding and non-breeding
              grounds twice every year. While some species migrate during the
              day (e.g., raptors, aerial insectivores), many others do so at
              night (e.g., most songbirds, waterfowl and shorebirds). For all of
              these species, migration may be the most challenging stage of the
              annual cycle for survival as conditions encountered en route are
              often unfamiliar and unpredictable. <br />
              <br />
              Nocturnal migrants, in particular, are faced with light pollution,
              an anthropogenic hazard that has increased rapidly in the last few
              decades. Light pollution is caused by artificial light at night
              (ALAN) deployed to illuminate human dwellings but spilling over
              and spreading into the airspace, reaching areas not inhabited by
              humans.Since the invention of the electrical light-bulb in the
              19th century, the use of ALAN and the associated light pollution
              has increased so dramatically that more than one third of the
              human population is no longer able to see the Milky Way.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MigratoryBirds;

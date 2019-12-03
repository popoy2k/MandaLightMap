import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

export class FLAP extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">
              Fatal Light Awareness Program (FLAP)
            </span>
            <p>
              According to Michael Mesure, executive director of the
              <span className="sk-strong">
                Toronto-based Fatal Light Awareness Program (FLAP)
              </span>
              , that light can attract bird and can disorient them, which works
              to safeguard migratory birds in the urban environment. <br />
              <br />
              Each year in New York City alone, about 10,000 migratory birds are
              injured or killed crashing into skyscrapers and high-rise
              buildings, According to Glenn Phillips, executive director of the
              New York City Audubon Society. The estimates as to the number of
              birds dying from collisions across North America annually range
              from 98 million to close to a billion. The U.S. Fish and Wildlife
              Service estimates 5–50 million birds die each year from collisions
              with communication towers.
              <br />
              <br />
              Turtles and birds are not the only wildlife affected by artificial
              night-time lighting. Frogs have been found to inhibit their mating
              calls when they are exposed to excessive light at night, reducing
              their reproductive capacity. The feeding behaviour of bats also is
              altered by artificial light. Researchers have blamed light
              pollution for declines in populations of North American moths,
              according to Ecological Consequences of Artificial Night Lighting.
              Almost all small rodents and carnivores, 80% of marsupials, and
              20% of primates are nocturnal. According to Chad Moore, Night Sky
              Program manager with the National Park Service, that humans needed
              to understand the nocturnality of creatures and protect the night
              can save the habitat of many animals.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FLAP;

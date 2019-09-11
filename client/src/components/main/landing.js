import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";

// Map related imports
import { feature as Feature } from "topojson-client";
import * as d3 from "d3";

export class landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MandaMap: null,
      svgW: 720,
      svgH: 500,
      svgInst: ".map-svg",
      currBrgy: "Mandaluyong City"
    };

    document.title = "Welcome to Skótos!";
  }

  componentDidMount() {
    let { svgW, svgH, svgInst } = this.state;
    axios
      .get(
        "https://raw.githubusercontent.com/popoy2k/MandaLightMap/master/Choropleth/NCR/Mandaluyong/MandaTopo.json"
      )
      .then(data => {
        d3.select(svgInst)
          .attr("width", svgW)
          .attr("height", svgH)
          .append("g")
          .selectAll("path")
          .data(Feature(data.data, data.data.objects.Mandaluyong).features)
          .enter()
          .append("path")
          .attr("d", this.path())
          .attr("cursor", "pointer")
          .attr("class", "brgy")
          .on("mouseover", brgyData => {
            const { NAME_3 } = brgyData.properties;
            this.setState({ currBrgy: `Brgy. ${NAME_3}` });
          })
          .on("mouseout", () => {
            this.setState({ currBrgy: "Mandaluyong City" });
          });
      });
  }

  path = () => {
    const { svgW, svgH } = this.state;
    return d3.geoPath().projection(
      d3
        .geoMercator()
        .center([121.03, 14.5758])
        .translate([svgH / 2, svgW / 2])
        .scale(750000)
    );
  };
  render() {
    const { currBrgy } = this.state;
    return (
      <Fragment>
        <NavBar />
        <section className="bg-frst">
          <div className="left-brand">
            <h1>Skótos</h1>
            <hr />
            <div className="left-brand-sub-contianer">
              <p>
                &nbsp;&nbsp; The word "
                <strong>
                  <i>Skótos</i>
                </strong>
                " is a Greek word that means Bright. This website is purposely
                made to help researchers, students and other individuals that
                seek "
                <strong>
                  <i>Mandaluyong City</i>
                </strong>{" "}
                " Light Pollution Data Statistics. And also, this website
                provides articles, researches, studies related to light
                pollution that can help their projects.
              </p>
            </div>
            <button className="csp-btn">Read more...</button>
          </div>
        </section>
        <section className="content">
          <h2>Mandaluyong City Statistical Map</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus
            laborum, asperiores facilis molestiae ullam doloribus illo officia
            et culpa natus adipisci, obcaecati magnam voluptas officiis ratione
            corrupti voluptatibus excepturi quae.
          </p>
          <div className="choropleth">
            <div className="data">
              <h2 className="currBrgy">{currBrgy}</h2>
              <ul>
                <li>Land area: </li>
                <li>Population: </li>
                <li>Light Intensity: </li>
              </ul>
            </div>
            <div className="map">
              <svg className="map-svg"></svg>
              <div>
                <small>
                  This Choropleth map is just partial, for more details{" "}
                  <Link to="/" className="prpl-btn">
                    Go here
                  </Link>
                </small>
              </div>
            </div>
          </div>
        </section>
        <section>Hala</section>
      </Fragment>
    );
  }
}

export default landing;

import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLanding } from "../../actions/auth";

// Map related imports
import { feature as Feature } from "topojson-client";
import * as d3 from "d3";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export class landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MandaMap: null,
      svgW: 720,
      svgH: 500,
      svgInst: ".map-svg",
      currBrgy: "Mandaluyong City",
      mapData: d3.map()
    };
    this.props.getLanding();
    document.title = "Welcome to Skótos!";
  }

  static propTypes = {
    getLanding: PropTypes.func.isRequired,
    landing: PropTypes.object
  };

  componentDidUpdate(prevState) {
    const { landing } = this.props;
    let { svgW, svgH, svgInst, mapData } = this.state;

    let colorScale = d3
      .scaleThreshold()
      .domain([20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 100])
      .range(d3.schemePurples[9]);

    if (prevState.landing !== landing) {
      landing.data.forEach(val => mapData.set(val.mapId, val.mean));
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
            .attr("fill", function(d) {
              d.total = mapData.get(d.properties.ID_3) || 0;

              return colorScale(d.total);
            })
            .on("mouseover", brgyData => {
              const { NAME_3 } = brgyData.properties;
              this.setState({ currBrgy: `Brgy. ${NAME_3}` });
            })
            .on("mouseout", () => {
              this.setState({ currBrgy: "Mandaluyong City" });
            });
        });
    }
  }

  // componentDidMount() {
  //     d3.select(svgInst)
  //       .selectAll("circle")
  //       .data(Feature(data.data, data.data.objects.Mandaluyong).features)
  //       .enter()
  //       .append("circle")
  //       .attr("cx", function(d) {
  //         let long = d3.geoCentroid(d);
  //         return d3
  //           .geoMercator()
  //           .center([121.03, 14.5758])
  //           .translate([svgH / 2, svgW / 2])
  //           .scale(750000)(long)[0];
  //       })
  //       .attr("cy", function(d) {
  //         let lat = d3.geoCentroid(d);
  //         return d3
  //           .geoMercator()
  //           .center([121.03, 14.5758])
  //           .translate([svgH / 2, svgW / 2])
  //           .scale(750000)(lat)[1];
  //       })
  //       .attr("r", "2px")
  //       .attr("fill", "black");
  //     d3.select(svgInst)
  //       .selectAll("text")
  //       .data(Feature(data.data, data.data.objects.Mandaluyong).features)
  //       .enter()
  //       .append("text")
  //       .attr("x", function(d) {
  //         let long = d3.geoCentroid(d);
  //         return d3
  //           .geoMercator()
  //           .center([121.03, 14.5758])
  //           .translate([svgH / 2, svgW / 2])
  //           .scale(750000)(long)[0];
  //       })
  //       .attr("y", function(d) {
  //         let lat = d3.geoCentroid(d);
  //         return d3
  //           .geoMercator()
  //           .center([121.03, 14.5758])
  //           .translate([svgH / 2, svgW / 2])
  //           .scale(750000)(lat)[1];
  //       })
  //       .attr("dy", -7)
  //       .style("fill", "rgba(91, 52, 231, 0.9)")
  //       .attr("text-anchor", "middle")
  //       .attr("font-size", "12px")
  //       .text(function(d) {
  //         return d.properties.NAME_3;
  //       });
  // });
  // }

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
            <Link to="/auth/register" className="csp-btn">
              Read more
            </Link>
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
            </div>
          </div>
          <p className="footer">
            This Choropleth map is just a partial, for more details{" "}
            <Link to="/" className="prpl-btn">
              Go here.
            </Link>
          </p>
        </section>
        <section className="third-content">
          <h2>Related Studies</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
            voluptatibus unde quae itaque cumque totam vero esse recusandae
            maxime consectetur!
          </p>
          <div className="cards">
            <div className="card">
              <FontAwesomeIcon icon="paw" className="rel-icons" />
              <h4>Animal</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius,
                quidem.
              </p>
              <Link className="third-btn" to="/">
                Learn more.
              </Link>
            </div>
            <div className="card">
              <FontAwesomeIcon className="rel-icons" icon="child" />
              <h4>Human</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolores, ullam?
              </p>
              <Link className="third-btn" to="/">
                Learn more.
              </Link>
            </div>
            <div className="card">
              <FontAwesomeIcon className="rel-icons" icon="industry" />
              <h4>Energy</h4>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptates, voluptate.
              </p>
              <Link className="third-btn" to="/">
                Learn more.
              </Link>
            </div>
            <div className="card">
              <FontAwesomeIcon className="rel-icons" icon="user-injured" />
              <h4>Safety</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
                rerum!
              </p>

              <Link className="third-btn" to="/">
                Learn more.
              </Link>
            </div>
          </div>
        </section>
        <section className="forth">
          <h1>Want to access our data?</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et sunt
            esse labore dolores assumenda dolorem officia obcaecati iure, cum
            laborum.
          </p>
          <div className="forth-btn">
            <Link to="/">Find here</Link>
          </div>
        </section>
        <section className="fifth"></section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  landing: state.data.landingData
});

export default connect(
  mapStateToProps,
  { getLanding }
)(landing);

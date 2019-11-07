import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLanding, getMainMap } from "../../actions/auth";

// Map related imports
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
      currPop: "386,276",
      currLA: "1124.97",
      currLiPo: "43.32",
      mapData: d3.map()
    };
    this.props.getLanding();
    document.title = "Welcome to Skótos!";
  }

  static propTypes = {
    getLanding: PropTypes.func.isRequired,
    getMainMap: PropTypes.func.isRequired,
    map: PropTypes.object,
    landing: PropTypes.object
  };

  renderLandingMap = (map, initData = null) => {
    let { svgW, svgH, svgInst, mapData } = this.state;
    const mapLiPoData = initData || mapData;

    let colorScale = d3
      .scaleThreshold()
      .domain(d3.range(20, 100, 5))
      .range(d3.schemePurples[9]);

    if (
      d3
        .select(".map-svg")
        .selectAll("*")
        .node()
    ) {
      d3.select(".map-svg")
        .selectAll("*")
        .remove();
    }

    let rateScale = d3.select(".map-svg");
    d3.select(svgInst)
      .attr("width", svgW)
      .attr("height", svgH)
      .append("g")
      .selectAll("path")
      .data(map)
      .enter()
      .append("path")
      .attr("d", this.path())
      .attr("cursor", "pointer")
      .attr("class", "brgy")
      .attr("fill", function(d) {
        d.total = mapLiPoData.get(d.properties.ID_3) || 0;
        return colorScale(d.total);
      })
      .on("mouseover", brgyData => {
        const { ID_3, NAME_3, area_3, population_3 } = brgyData.properties;
        let currLiPo = parseFloat(mapLiPoData.get(ID_3)).toFixed(2) || 0;

        this.setState({
          currBrgy: `Brgy. ${NAME_3}`,
          currLA: area_3,
          currPop: population_3,
          currLiPo
        });
      })
      .on("mouseout", e => {
        const { area_1, population_1 } = e.properties;
        this.setState({
          currBrgy: "Mandaluyong City",
          currLiPo: "43.32",
          currLA: area_1,
          currPop: population_1
        });
      });

    let x = d3
      .scaleLinear()
      .domain([1, 10])
      .rangeRound([50, 100]);
    let gRS = rateScale.append("g").attr("transform", "translate(-20,50)");

    gRS
      .selectAll("rect")
      .data(
        colorScale.range().map(function(d) {
          d = colorScale.invertExtent(d);

          if (d[0] == null) d[0] = x.domain()[0];
          if (d[1] == null) d[1] = x.domain()[1];

          if (d[0] <= 1) d[0] = 15;

          return d;
        })
      )
      .enter()
      .append("rect")
      .attr("height", 8)

      .attr("x", function(d) {
        return x(d[0]);
      })
      .attr("width", function(d) {
        return x(d[1]) - x(d[0]);
      })
      .attr("fill", function(d) {
        return colorScale(d[0]);
      });
    gRS
      .append("text")
      .attr("x", x.range()[0])
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .attr("font-size", "12px")
      .attr("transform", "translate(80,0)")
      .text("Radiance Scale");

    gRS
      .call(
        d3
          .axisBottom(x)
          .tickSize(13)
          .tickValues(colorScale.domain().filter(val => val <= 60))
      )
      .select(".domain")
      .remove();
  };

  componentDidUpdate(prevProps) {
    const { landing, map } = this.props;
    const { mapData } = this.state;

    if (prevProps.landing !== landing) {
      landing.data.forEach(val => mapData.set(val.mapId, val.mean));
    }
    if (
      (prevProps.map !== map || prevProps.landing !== landing) &&
      map.mainMap !== null
    ) {
      this.renderLandingMap(map.mainMap, mapData);
    }
  }

  componentDidMount() {
    const { map, landing } = this.props;

    if (!map.mainMap) {
      this.props.getMainMap();
    }

    if (Object.entries(landing).length) {
      this.props.getLanding();
    }
  }

  path = () => {
    const { svgW, svgH } = this.state;
    return d3.geoPath().projection(
      d3
        .geoMercator()
        .center([121.03, 14.578])
        .translate([svgH / 2, svgW / 2])
        .scale(750000)
    );
  };

  render() {
    const { currBrgy, currLA, currLiPo, currPop } = this.state;

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
              <table className="landingTable">
                <tbody>
                  <tr>
                    <td>Land Area</td>
                    <td>{currLA} ha</td>
                  </tr>
                  <tr>
                    <td>Population</td>
                    <td>{currPop}</td>
                  </tr>
                  <tr>
                    <td>Radiance</td>
                    <td>{currLiPo} W/cm2*sr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="map">
              <svg className="map-svg"></svg>
            </div>
          </div>
          <p className="footer">
            This Choropleth map is just a partial, for more details{" "}
            <Link to="/map" className="prpl-btn">
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
  landing: state.data.landingData,
  map: state.map
});

export default connect(
  mapStateToProps,
  { getLanding, getMainMap }
)(landing);

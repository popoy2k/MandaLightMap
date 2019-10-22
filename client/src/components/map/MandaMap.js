import React, { Component, Fragment } from "react";
import NavBar from "../main/NavBar";
import { Icon, TreeSelect, Select } from "antd";
import { brgyData, treeData } from "./treeData";
import * as d3 from "d3";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMainMap, getMapData } from "../../actions/auth";

const { SHOW_PARENT } = TreeSelect;
const { Option, OptGroup } = Select;

export class MandaMap extends Component {
  state = {
    treeValue: ["2019-All"],
    brgyValue: ["00-All"],
    textureValue: { key: "01-Choro" },
    colorValue: { key: "02-Purple" },
    choroColorValue: d3.schemePurples[9],
    mainMapData: {},
    currMainData: {},
    lipoMeanMapData: d3.map(),
    lipoMinMapData: d3.map(),
    lipoMaxMapData: d3.map(),
    currLoc: "Mandaluyong City",
    currLA: "1124.97",
    currPop: "386,276",
    radMean: "44.94",
    radMax: "75.14",
    radMin: "31.19"
  };

  static propTypes = {
    getMainMap: PropTypes.func.isRequired,
    getMapData: PropTypes.func.isRequired,
    map: PropTypes.object,
    mainData: PropTypes.array
  };

  treeChange = value => {
    this.setMainData(value);
    this.setState({ treeValue: value });
  };

  setChoroColor = value => {
    let finalColor = null;

    switch (value.key) {
      case "02-Purple":
        finalColor = d3.schemePurples[9];
        break;
      case "02-Green":
        finalColor = d3.schemeGreens[9];
        break;
      case "02-Blue":
        finalColor = d3.schemeBlues[9];
        break;
      case "02-Grey":
        finalColor = d3.schemeGreys[9];
        break;
      case "02-Orange":
        finalColor = d3.schemeOranges[9];
        break;
      case "02-Dawn":
        finalColor = d3.schemeRdBu[9];
        break;
      case "02-Midnight":
        finalColor = d3.schemeRdGy[9];
        break;
      case "02-Spring":
        finalColor = d3.schemeRdYlBu[9];
        break;
      case "02-Grass":
        finalColor = d3.schemeRdYlGn[9];
        break;
      case "02-Ocean":
        finalColor = d3.schemeSpectral[9];
        break;
      default:
        finalColor = d3.schemePurples[9];
    }
    this.setState({ choroColorValue: finalColor });
    this.reRenderMap(finalColor);
  };

  setMainData = value => {
    const { mainData } = this.props;
    const { lipoMeanMapData, lipoMaxMapData, lipoMinMapData } = this.state;

    let selectedData = [];
    let tempData = [];
    let finalData = [];

    value.forEach(val => {
      let iterData = val.split("-");
      if (iterData[1] === "All") {
        selectedData.push(...mainData.filter(val => val.year === iterData[0]));
      } else {
        selectedData.push(
          ...mainData.filter(
            val => val.year === iterData[0] && val.month === iterData[1]
          )
        );
      }
    });

    let brgyKeys = selectedData[0].lipoData.map(val => val.mapId);

    selectedData.forEach(val => tempData.push(...val.lipoData));

    brgyKeys.forEach(val =>
      finalData.push(tempData.filter(filVal => filVal.mapId === val))
    );

    let finalCurrMainData = finalData.map(val => ({
      id: val[0].mapId,
      mean:
        val.map(meanVal => meanVal.mean).reduce((prev, curr) => prev + curr) /
        val.length,
      min: val.map(minVal => minVal.min).sort((a, b) => a - b)[0],
      max: val.map(maxVal => maxVal.max).sort((a, b) => b - a)[0]
    }));

    finalCurrMainData.forEach(val => {
      lipoMeanMapData.set(val.id, val.mean);
      lipoMaxMapData.set(val.id, val.max);
      lipoMinMapData.set(val.id, val.min);
    });

    let currMean =
      finalCurrMainData
        .map(val => val.mean)
        .reduce((prev, curr) => prev + curr) / finalCurrMainData.length;

    let currMax = finalCurrMainData
      .map(val => val.max)
      .sort((a, b) => b - a)[0];
    let currMin = finalCurrMainData
      .map(val => val.min)
      .sort((a, b) => a - b)[0];

    this.setState({
      mainMapData: selectedData,
      currMainData: finalCurrMainData,
      currLoc: "Mandaluyong City",
      currLA: "1124.97",
      currPop: "386,276",
      radMean: currMean.toFixed(2),
      radMax: currMax.toFixed(2),
      radMin: currMin.toFixed(2)
    });

    this.reFill();
  };

  brgyChange = value => {
    this.setNewBrgy(value);
    this.setState({ brgyValue: value });
  };

  setNewBrgy = value => {
    let svg = d3.select("svg#main-mapped");
    let currBrgy = value.map(val => val.split("-")[1]);

    svg.selectAll("path").attr("display", d => {
      if (currBrgy[0] === "All") {
        return "block";
      }
      if (!currBrgy.includes(`${d.properties.ID_3}`)) {
        console.log(d.properties.NAME_3, d.properties.ID_3);
        return "none";
      }
      return "block";
    });

    svg.selectAll("image").attr("display", d => {
      if (currBrgy[0] === "All") {
        return "block";
      }
      if (!currBrgy.includes(`${d.properties.ID_3}`)) {
        console.log(d.properties.NAME_3, d.properties.ID_3);
        return "none";
      }
      return "block";
    });
  };

  textureChange = value => this.setState({ textureValue: value });

  colorChange = value => {
    this.setChoroColor(value);
    this.setState({ colorValue: value });
  };

  componentDidUpdate(curr, prev) {
    // console.log(prev);
    if (curr.map !== prev.map) {
      if (!curr.map) {
        this.renderMap(curr.map);
      }
    }
  }

  componentDidMount() {
    document.title = "Skótos - Light Pollution Map";
    const { map, mainData } = this.props;

    if (!mainData) {
      this.props.getMapData({ mapObj: "2019-All" });
    }

    if (mainData) {
      this.setMainData(["2019-All"]);
      this.setChoroColor({ key: "02-Purple" });
    }

    if (!map) {
      this.props.getMainMap();
    }

    if (map) {
      this.renderMap(map);
    }

    this.addLocationName();
  }

  addLocationName = () => {
    const { map } = this.props;
    let newMap = JSON.parse(map.mainMap);
    let svg = d3.select("svg#main-mapped");
    let svgH = svg.attr("height"),
      svgW = svg.attr("width");
    let geo = d3
      .geoMercator()
      .center([121.012, 14.602])
      .translate([svgH / 2, svgW / 2])
      .scale(1100000);

    svg
      .selectAll("image")
      .data(newMap)
      .enter()
      .append("image")
      .attr("x", d => geo(d3.geoCentroid(d))[0] - 15)
      .attr("y", d => geo(d3.geoCentroid(d))[1] - 15)
      .attr("width", 20)
      .attr("height", 24)
      .attr(
        "xlink:href",
        "https://image.flaticon.com/icons/svg/252/252025.svg"
      );
  };

  reFill = () => {
    const { choroColorValue, lipoMeanMapData } = this.state;
    let svg = d3.select("svg#main-mapped");

    let reFillCS = d3
      .scaleThreshold()
      .domain(d3.range(20, 100, 5))
      .range(choroColorValue);

    svg.selectAll("path").attr("fill", d => {
      return reFillCS(lipoMeanMapData.get(d.properties.ID_3));
    });
  };

  reRenderMap = someColor => {
    const { currMainData } = this.state;
    let svg = d3.select("svg#main-mapped");
    let scale = d3.select("svg#main-mapped>g#map-scale");
    let reColorScale = d3
      .scaleThreshold()
      .domain(d3.range(20, 100, 5))
      .range(someColor);

    scale.selectAll("rect").attr("fill", d => reColorScale(d[0]));

    svg
      .selectAll("path")
      .attr("fill", d => {
        return reColorScale(
          currMainData.filter(val => val.id === d.properties.ID_3)[0].mean
        );
      })
      .on("click", d => {
        let iterData = currMainData.filter(
          val => val.id === d.properties.ID_3
        )[0];
        this.setState({
          currLoc: d.properties.NAME_3,
          currLA: d.properties.area_3,
          currPop: d.properties.population_3,
          radMean: iterData.mean.toFixed(2),
          radMax: iterData.max.toFixed(2),
          radMin: iterData.min.toFixed(2)
        });
      });
  };

  renderMap = map => {
    map = JSON.parse(map.mainMap);

    const {
      lipoMeanMapData,
      lipoMaxMapData,
      lipoMinMapData,
      choroColorValue
    } = this.state;
    let svg = d3.select("svg#main-mapped");
    let scale = d3.select("svg#main-mapped>g#map-scale");

    // For scale presentation
    let x = d3
      .scaleLinear()
      .domain([1, 10])
      .rangeRound([50, 100]);

    let colorScale = d3
      .scaleThreshold()
      .domain(d3.range(20, 100, 5))
      .range(choroColorValue);

    let path = () => {
      let svgH = +svg.attr("height"),
        svgW = +svg.attr("width");
      return d3.geoPath().projection(
        d3
          .geoMercator()
          .center([121.012, 14.602])
          .translate([svgH / 2, svgW / 2])
          .scale(1100000)
      );
    };

    scale
      .attr("transform", "translate(-20,50)")
      .selectAll("rect")
      .data(
        colorScale.range().map(d => {
          d = colorScale.invertExtent(d);

          if (d[0] == null) d[0] = x.domain()[0];
          if (d[1] == null) d[1] = x.domain()[1];

          if (d[0] <= 1) d[0] = 15;

          return d;
        })
      )
      .enter()
      .append("rect")
      .attr("height", 15)
      .attr("x", d => x(d[0]))
      .attr("width", d => x(d[1]) - x(d[0]))
      .attr("fill", d => colorScale(d[0]));

    scale
      .append("text")
      .attr("x", x.range()[0])
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .attr("font-size", "12px")
      .attr("transform", "translate(80,0)")
      .text("Radiance Scale");

    scale
      .call(
        d3
          .axisBottom(x)
          .tickSize(20)
          .tickValues(colorScale.domain().filter(val => val <= 60))
      )
      .select(".domain")
      .remove();

    svg
      .append("g")
      .selectAll("path")
      .data(map)
      .enter()
      .append("path")
      .attr("d", path())
      .attr("cursor", "pointer")
      .attr("class", "brgy")
      .attr("fill", d => {
        d.mean = lipoMeanMapData.get(d.properties.ID_3) || 0;
        return colorScale(d.mean);
      })
      .on("click", d => {
        d.mean = lipoMeanMapData.get(d.properties.ID_3);
        d.min = lipoMinMapData.get(d.properties.ID_3);
        d.max = lipoMaxMapData.get(d.properties.ID_3);
        this.setState({
          currLoc: d.properties.NAME_3,
          currLA: d.properties.area_3,
          currPop: d.properties.population_3,
          radMean: d.mean.toFixed(2),
          radMax: d.max.toFixed(2),
          radMin: d.min.toFixed(2)
        });
      });
  };

  render() {
    const {
      treeValue,
      brgyValue,
      textureValue,
      colorValue,
      currLoc,
      currLA,
      currPop,
      radMean,
      radMax,
      radMin
    } = this.state;

    const tProps = {
      treeData,
      value: treeValue,
      onChange: this.treeChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: "Please select",
      dropdownStyle: {
        maxHeight: "40vh"
      },
      style: {
        width: "100%"
      },
      maxTagCount: 3,
      maxTagPlaceholder: args => `Too many to show.. (${args.length} items)`
    };
    const bProps = {
      treeData: brgyData,
      value: brgyValue,
      onChange: this.brgyChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: "Please select",
      dropdownStyle: {
        maxHeight: "40vh"
      },
      style: {
        width: "100%"
      },
      maxTagCount: 3,
      maxTagPlaceholder: args => `Too many to show.. (${args.length} items)`
    };
    let isColored = (
      <div className="form-group">
        <h4>Color</h4>
        <Select
          style={{ width: "100%" }}
          defaultValue={colorValue}
          onChange={this.colorChange}
          labelInValue
        >
          <OptGroup label="Sequential">
            <Option key="02-Purple" value="02-Purple">
              Purple
            </Option>
            <Option key="02-Green" value="02-Green">
              Green
            </Option>
            <Option key="02-Blue" value="02-Blue">
              Blue
            </Option>
            <Option key="02-Grey" value="02-Grey">
              Grey
            </Option>
            <Option key="02-Orange" value="02-Orange">
              Orange
            </Option>
          </OptGroup>
          <OptGroup label="Diverging">
            <Option key="02-Dawn" value="02-Dawn">
              Dawn
            </Option>
            <Option key="02-Midnight" value="02-Midnight">
              Midnight
            </Option>
            <Option key="02-Spring" value="02-Spring">
              Spring
            </Option>
            <Option key="02-Grass" value="02-Grass">
              Grass
            </Option>
            <Option key="02-Ocean" value="02-Ocean">
              Ocean
            </Option>
          </OptGroup>
        </Select>
      </div>
    );

    if (textureValue.key !== "01-Choro") {
      isColored = "";
    }

    const { mainData } = this.props;
    if (!mainData) {
      return <Redirect to="/map" />;
    }
    return (
      <Fragment>
        <NavBar />
        <section className="sec-map">
          <h2>Mandaluyong City: Light Pollution Map</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto sunt
            hic totam, et magni asperiores fugit quis fuga rerum doloribus ad
            cupiditate eius quos deserunt tempore obcaecati a est reprehenderit
            assumenda quaerat nam eos aliquam? Iure quae debitis consectetur
            expedita doloribus tenetur, a autem. Facere molestias dicta
            reiciendis omnis enim.
          </p>
        </section>
        <section className="main-map">
          <div className="main-map-div">
            <div className="scoreboard-panel">
              <h2>Statistic</h2>
              <div className="main">
                <ul>
                  <li title="Area Location">
                    <Icon type="environment" className="sk-icon-color" />{" "}
                    {currLoc}
                  </li>
                  <li title="Land Area">
                    <Icon type="area-chart" className="sk-icon-color" />{" "}
                    {currLA} ha
                  </li>
                  <li title="Population">
                    <Icon type="team" className="sk-icon-color" /> {currPop}
                  </li>
                  <li title="Light Intensity">
                    <Icon type="heat-map" className="sk-icon-color" /> Radiance
                    - W/cm2*sr
                    <ul>
                      <li></li>
                      <li>
                        {radMean} <small className="secondary">Mean</small>
                      </li>
                      <li>
                        {radMax} <small className="secondary">Max</small>
                      </li>
                      <li>
                        {radMin} <small className="secondary">Min</small>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="map-setting-panel">
              <h2>Settings</h2>
              <div className="main">
                <div className="form-group">
                  <h4>VIIRS Layers</h4>
                  <TreeSelect {...tProps} allowClear showSearch />
                </div>

                <div className="form-group">
                  <h4>Area Coverage</h4>
                  <TreeSelect {...bProps} allowClear showSearch />
                </div>
                <div className="form-group">
                  <h4>Area Texture</h4>
                  <Select
                    style={{ width: "100%" }}
                    defaultValue={{ key: "01-Choro" }}
                    onChange={this.textureChange}
                    dropdownStyle={{ maxHeight: "40vh" }}
                    labelInValue
                  >
                    <Option key="01-Choro" value="01-Choro">
                      Choropleth
                    </Option>
                    <Option key="01-NE" value="01-NE">
                      Natural Earth
                    </Option>
                    <Option key="01-Roads" value="01-Roads">
                      Roads
                    </Option>
                    <Option key="01-Hybrid" value="01-Hybrid">
                      Hybrid
                    </Option>
                  </Select>
                </div>
                {isColored}
              </div>
            </div>
          </div>
          <div className="main-map-svg">
            <svg id="main-mapped" style={{ width: "100%", height: "100%" }}>
              <g id="map-scale"></g>
            </svg>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  map: state.map,
  mainData: state.data.mainMapData
});

export default connect(
  mapStateToProps,
  { getMainMap, getMapData }
)(MandaMap);

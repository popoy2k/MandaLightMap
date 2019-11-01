import React, { Component, Fragment } from "react";
import NavBar from "../main/NavBar";
import { Icon, TreeSelect, Select, Checkbox, Row, Radio } from "antd";
import { brgyData, treeData, areaData } from "./treeData";
import * as d3 from "d3";
import * as d3Arr from "d3-array";
import { Redirect } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMainMap, getMapData } from "../../actions/auth";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const { SHOW_PARENT } = TreeSelect;
const { Option, OptGroup } = Select;

export class MandaMap extends Component {
  state = {
    treeValue: ["2019-All"],
    brgyValue: ["00-All"],
    colorValue: { key: "02-Purple" },
    colorDisabled: false,
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
    radMin: "31.19",
    showIcon: false,
    showIntensity: false,
    iconDisable: false,
    intensityDisable: false,
    textureVal: "choropleth"
  };

  static propTypes = {
    getMainMap: PropTypes.func.isRequired,
    getMapData: PropTypes.func.isRequired,
    map: PropTypes.object,
    mainData: PropTypes.array
  };

  intensityChange = value => {
    const { showIntensity } = this.state;
    this.addHighlight(showIntensity);
    this.setState({ showIntensity: !showIntensity });
  };

  popupInteractive = data => {
    const {
      mainMapData,
      lipoMaxMapData,
      lipoMeanMapData,
      lipoMinMapData
    } = this.state;
    const currentData = data.feature.properties;
    const {
      NAME_3: currLoc,
      area_3: currLA,
      population_3: currPop,
      ID_3: mainID
    } = currentData;
    const radMean = lipoMeanMapData.get(mainID).toFixed(2),
      radMax = lipoMaxMapData.get(mainID).toFixed(2),
      radMin = lipoMinMapData.get(mainID).toFixed(2);

    this.setState({ currLoc, currLA, currPop, radMean, radMin, radMax });
    let initData = mainMapData;
    const numOfYears = [...new Set(initData.map(mVal => mVal.year))];
    let temp = [];
    if (!numOfYears.length) {
      return;
    }
    initData = initData
      .map(mVal => ({
        month: mVal.month,
        year: parseInt(mVal.year),
        data: mVal.lipoData.map(mmVal => ({
          id: mmVal.mapId,
          mean: mmVal.mean
        }))
      }))
      .sort((a, b) => a.year - b.year);

    if (numOfYears.length > 1) {
      temp = [...d3Arr.group(initData, d => d.year)]
        .map(mVal => ({
          year: mVal[0],
          data: mVal[1]
            .map(mmVal => mmVal.data.map(mmmVal => mmmVal))
            .flat(Infinity)
        }))
        .map(m2Val => ({
          year: m2Val.year,
          data: [...d3Arr.group(m2Val.data, d2 => d2.id)].map(mm2Val => ({
            id: mm2Val[0],
            mean:
              mm2Val[1]
                .map(mmm2Val => mmm2Val.mean)
                .reduce((prev, curr) => prev + curr) / mm2Val[1].length
          }))
        }));
      initData = temp;
    }

    let finalData = initData.map(mVal => ({
      ...mVal,
      data: mVal.data.filter(fVal => fVal.id === currentData.ID_3)[0]
    }));

    let width = 290;
    let height = 80;
    let margin = { left: 20, right: 10, top: 40, bottom: 40 };

    let div = d3.create("div");
    let svg = div
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
    let g = svg
      .append("g")
      .attr("transform", "translate(" + [margin.left, margin.top] + ")");

    let y = d3
      .scaleLinear()
      .domain([0, 70])
      .range([height, 0]);

    let yAxis = d3
      .axisLeft()
      .ticks(6)
      .scale(y);
    g.append("g").call(yAxis);
    let x = d3
      .scaleBand()
      .domain(d3.range(initData.length))
      .range([2, width]);

    let xAxis = d3
      .axisBottom()
      .scale(x)
      .tickFormat(function(d) {
        let name = finalData.map(m => m.month || m.year)[d];
        if (name < 13) {
          return new Date(name).toDateString().split(" ")[1];
        }
        return name;
      });

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)translate(-12,-15)");

    g.selectAll("rect")
      .data(finalData)
      .enter()
      .append("rect")
      .attr("y", height)
      .attr("height", 0)
      .attr("width", x.bandwidth() - 2)
      .attr("x", function(d, i) {
        return x(i);
      })
      .attr("fill", "steelblue")
      .transition()
      .attr("height", function(d) {
        return height - y(d.data.mean);
      })
      .attr("y", function(d) {
        return y(d.data.mean);
      })
      .duration(1000);

    g.append("g")
      .attr("class", "barText")
      .selectAll("text")
      .data(finalData)
      .enter()
      .append("text")
      .style("opacity", 0)
      .attr("height", d => height - y(d.data.mean))
      .attr("y", d => y(d.data.mean) - 5)
      .attr("x", (d, i) => x(i) + (x.bandwidth() - 2) / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text(function(d) {
        return d.data.mean.toFixed(1);
      })
      .transition()
      .style("opacity", 1)
      .delay(600)
      .duration(300);

    svg
      .append("text")
      .style("font-size", "20px")
      .text(currentData.NAME_3)
      .attr("x", width / 2 + margin.left)
      .attr("y", 20)
      .attr("text-anchor", "middle");

    return div.node();
  };

  textureRadioChange = value => {
    this.shiftTexture(value.target.value);
    this.setState({ textureVal: value.target.value });
  };

  shiftTexture = value => {
    if (!value) {
      return;
    }

    const { map } = this.props;
    d3.select("div.main-map-svg")
      .attr("class", "main-map-svg")
      .attr("id", "main-map-svg")
      .selectAll("*")
      .remove();

    /*
      0.002508 & 0.001125 
      Workaround to polygons to be aligned
    */

    let sample = map.mainMap.map(mVal => ({
      ...mVal,
      geometry: {
        ...mVal.geometry,
        coordinates: mVal.geometry.coordinates.map(m2Val =>
          m2Val.map(m3Val => [m3Val[0] + 0.002908, m3Val[1] - 0.0010525])
        )
      }
    }));

    this.setState({ showIcon: false, showIntensity: false });

    let geoData = { type: "featureCollection", features: [...sample] };

    switch (value) {
      case "choropleth":
        this.setMainData(["2019-All"]);
        this.setChoroColor({ key: "02-Purple" });
        this.renderMap(map);
        break;
      case "natural":
        let thisMap = L.map("main-map-svg", {
          center: [14.58108681, 121.03394965],
          zoom: 14,
          zoomControl: false
        });

        L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
          maxZoom: 20,
          maxNativeZoom: 17,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
        }).addTo(thisMap);

        L.geoJSON(geoData)
          .addTo(thisMap)
          .bindPopup(this.popupInteractive);

        // let marker;

        // thisMap.on("click", function(event) {
        //   if (marker) {
        //     thisMap.removeLayer(marker);
        //   }

        //   const { lat, lng } = event.latlng;
        //   marker = new L.Marker([lat, lng]).addTo(thisMap);
        // });

        break;
      case "roads":
        break;
      default:
        return;
    }
  };

  addHighlight = value => {
    const { lipoMeanMapData } = this.state;
    let svg = d3.select("svg#main-mapped");

    let temp = lipoMeanMapData.entries().sort((a, b) => b.value - a.value);
    svg.selectAll("path").each(function(d) {
      if (!value) {
        if (temp[0].key === `${d.properties.ID_3}`) {
          d3.select(this)
            .transition()
            .duration(300)
            .ease(d3.easeLinear)
            .attr("class", "brgy high-pulse");
        }
        if (temp.slice(-1)[0].key === `${d.properties.ID_3}`) {
          d3.select(this)
            .transition()
            .duration(300)
            .ease(d3.easeLinear)
            .attr("class", "brgy low-pulse");
        }
      } else {
        if (temp[0].key === `${d.properties.ID_3}`) {
          d3.select(this)
            .transition()
            .duration(300)
            .ease(d3.easeLinear)
            .attr("class", "brgy");
        }
        if (temp.slice(-1)[0].key === `${d.properties.ID_3}`) {
          d3.select(this)
            .transition()
            .duration(300)
            .ease(d3.easeLinear)
            .attr("class", "brgy");
        }
      }
    });

    let highlight = svg
      .append("g")
      .attr("transform", "translate(10, 100)")
      .attr("id", "highlight");

    if (!value) {
      highlight
        .selectAll("rect")
        .data([{ no: 1, name: "Lowest LiPo" }, { no: 2, name: "Highest LiPo" }])
        .enter()
        .append("rect")
        .attr("height", 15)
        .attr("x", d => 15)
        .attr("y", d => d.no * 20)
        .attr("width", d => 15)
        .attr("fill", d =>
          d.no % 2 === 0 ? "rgba(248, 47, 7)" : "rgb(20, 240, 75)"
        );

      highlight
        .selectAll("text")
        .data([
          { no: 30, name: "Lowest LiPo" },
          { no: 50, name: "Highest LiPo" }
        ])
        .enter()
        .append("text")
        .attr("x", 35)
        .attr("y", d => d.no)
        .attr("font-size", "12px")
        .text(d => d.name);
    } else {
      d3.selectAll("g#highlight").remove();
    }
  };

  iconChange = value => {
    const { showIcon } = this.state;
    this.iconMethod(showIcon ? "none" : "block");
    this.setState({ showIcon: !showIcon });
    if (!showIcon === true) {
      this.addLocationName();
    } else {
      d3.select("div.main-map-svg")
        .selectAll("div")
        .style("opacity", 0);
    }
  };

  iconMethod = value => {
    let svg = d3.select("svg#main-mapped");
    let { currMainData } = this.state;

    if (value === "block") {
      svg
        .selectAll("image")
        .style("opacity", 0)
        .attr("display", d => {
          if (currMainData.find(fVal => fVal.id === d.properties.ID_3)) {
            return value;
          }
          return "none";
        })
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .style("opacity", 1);
    } else {
      svg
        .selectAll("image")
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .style("opacity", 0)
        .on("end", d => {
          svg.selectAll("image").attr("display", d => value);
        });
    }
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
    const {
      lipoMeanMapData,
      lipoMaxMapData,
      lipoMinMapData,
      showIcon
    } = this.state;
    if (value.length < 1) {
      this.setState({ currMainData: [] });
      return this.reRenderMap(d3.schemePurples[9]);
    }

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

    if (showIcon) {
      this.addLocationName(selectedData);
    }
  };

  brgyChange = value => {
    this.setNewData(value);
    this.setNewBrgy(value);
    if (!value.length || (value[0].indexOf("All") < 0 && value.length === 1)) {
      this.setState({
        brgyValue: value,
        showIntensity: false,
        intensityDisable: true,
        colorDisabled: true
      });
      return;
    }
    this.setState({
      brgyValue: value,
      showIntensity: false,
      intensityDisable: false,
      colorDisabled: false
    });
  };

  setNewData = value => {
    const {
      currMainData,
      lipoMeanMapData,
      lipoMinMapData,
      lipoMaxMapData,
      mainMapData
    } = this.state;

    let initValue = value.map(val => val.split("-"));
    let finalSet = [];
    let finalData = [];
    let allContainer = "";
    let finalLoc = "";

    if (!value.length) {
      if (currMainData.length || currMainData) {
        this.setState({
          currMainData: {},
          currLoc: "",
          currLA: "",
          currPop: "",
          radMax: "",
          radMin: "",
          radMean: ""
        });
      }
      lipoMeanMapData.clear();
      lipoMinMapData.clear();
      lipoMaxMapData.clear();
      return;
    }

    allContainer = initValue.filter(val => isNaN(parseInt(val[1])))[0] || "";

    if (allContainer) {
      switch (allContainer[0]) {
        case "00":
          finalLoc = "Mandaluyong City";
          finalSet = areaData.map(val => val.id);
          break;
        case "001":
          finalLoc = "District 1 Mandaluyong City";
          finalSet = areaData
            .filter(fVal => fVal.district === 1)
            .map(mVal => mVal.id);
          break;
        case "002":
          finalLoc = "District 2 Mandaluyong City";
          finalSet = areaData
            .filter(fVal => fVal.district === 2)
            .map(mVal => mVal.id);
          break;
        default:
          break;
      }
    }

    initValue
      .filter(fVal => parseInt(fVal[1]))
      .forEach(feVal => {
        finalSet.push(parseInt(feVal.slice(-1)[0]));
      });

    if (initValue.filter(fVal => parseInt(fVal[1])).length) {
      finalLoc = "Custom Area";
    }
    if (finalSet.length === 1) {
      finalLoc = areaData.filter(fVal => fVal.id === finalSet[0])[0].loc_name;
    }

    let tempFinalData = mainMapData
      .map(mVal => mVal.lipoData.filter(fVal => finalSet.includes(fVal.mapId)))
      .flat(Infinity);
    finalSet.forEach(val =>
      finalData.push(tempFinalData.filter(fVal => fVal.mapId === val))
    );

    finalData = finalData.map(mVal => ({
      id: mVal[0].mapId,
      mean:
        mVal.map(meanVal => meanVal.mean).reduce((prev, curr) => prev + curr) /
        mVal.length,
      max: mVal.map(maxVal => maxVal.max).sort((a, b) => b - a)[0],
      min: mVal.map(minVal => minVal.min).sort((a, b) => a - b)[0]
    }));

    let tempStats = areaData
      .filter(fVal => finalSet.includes(fVal.id))
      .reduce(
        (prev, curr) => ({
          loc_area: parseFloat(prev.loc_area) + parseFloat(curr.loc_area),
          loc_pop: `${parseInt(prev.loc_pop.replace(",", "")) +
            parseInt(curr.loc_pop.replace(",", ""))}`
        }),
        { loc_area: "0", loc_pop: "0" }
      );

    this.setState({
      currMainData: finalData,
      currLoc: finalLoc,
      currLA: parseFloat(tempStats.loc_area).toFixed(2),
      currPop: parseInt(tempStats.loc_pop).toLocaleString(),
      radMean: (
        finalData.reduce((prev, curr) => ({ mean: prev.mean + curr.mean }))
          .mean / finalData.length
      ).toFixed(2),
      radMin: finalData
        .map(mVal => mVal.min)
        .sort((a, b) => a - b)[0]
        .toFixed(2),
      radMax: finalData
        .map(mVal => mVal.max)
        .sort((a, b) => b - a)[0]
        .toFixed(2)
    });
    lipoMeanMapData.clear();
    lipoMaxMapData.clear();
    lipoMinMapData.clear();
    finalData.forEach(feVal => {
      lipoMeanMapData.set(feVal.id, feVal.mean);
      lipoMinMapData.set(feVal.id, feVal.min);
      lipoMaxMapData.set(feVal.id, feVal.max);
    });
  };

  fadeElement = (self, opacity, interval = 300) => {
    return d3
      .select(self)
      .transition()
      .duration(interval)
      .ease(d3.easeLinear)
      .style("opacity", opacity);
  };

  setNewBrgy = value => {
    let svg = d3.select("svg#main-mapped");
    let self = this;
    const { lipoMeanMapData } = this.state;

    if (value.length < 1) {
      self.iconMethod("none");
      self.setState({
        iconDisable: true,
        intensityDisable: true,
        showIcon: false
      });
    } else {
      self.setState({
        iconDisable: false,
        intensityDisable: false,
        showIcon: true
      });
    }

    svg.selectAll("path").each(function(d) {
      if (lipoMeanMapData.has(d.properties.ID_3)) {
        self
          .fadeElement(this, 1)
          .attr("cursor", "pointer")
          .attr("class", "brgy");
        return;
      }
      self
        .fadeElement(this, 0)
        .attr("cursor", "default")
        .attr("class", "brgy-disabled");
    });

    svg.selectAll("image").each(function(d) {
      if (lipoMeanMapData.has(d.properties.ID_3)) {
        self.fadeElement(this, 1, 1000).attr("cursor", "default");
        return;
      }
      self
        .fadeElement(this, 0)
        .attr("cursor", "default")
        .attr("class", "brgy-disabled");
    });
  };

  colorChange = value => {
    this.setChoroColor(value);
    this.setState({ colorValue: value });
  };

  componentDidUpdate(prevProps) {
    const { map, mainData } = this.props;

    if (prevProps.map.mainMap !== map.mainMap) {
      if (mainData) {
        this.setMainData(["2019-All"]);
        this.renderMap(map);
      }
    }

    if (prevProps.mainData !== mainData) {
      this.setMainData(["2019-All"]);
      if (map.mainMap) {
        this.renderMap(map);
      }
    }
  }

  componentDidMount() {
    document.title = "Skótos - Light Pollution Map";
    const { map, mainData } = this.props;

    if (map.mainMap === null) {
      this.props.getMainMap();
    }

    if (!mainData) {
      this.props.getMapData({ mapObj: "2019-All" });
    }

    if (map.mainMap && mainData) {
      this.setMainData(["2019-All"]);
      this.setChoroColor({ key: "02-Purple" });
      this.renderMap(map);
    }
  }

  setCurrentSelected = data => {
    const {
      ID_3: ID,
      area_3: LA,
      population_3: Pop,
      NAME_3: Loc
    } = data.properties;
    const { currMainData } = this.state;
    const finalData = currMainData.filter(val => val.id === ID)[0];

    this.setState({
      currLoc: Loc,
      currLA: LA,
      currPop: Pop,
      radMean: finalData.mean.toFixed(2),
      radMin: finalData.min.toFixed(2),
      radMax: finalData.max.toFixed(2)
    });
  };

  addLocationName = (newSet = null) => {
    const { map } = this.props;
    const { mainMapData, choroColorValue } = this.state;
    let initData = newSet || mainMapData;
    const numOfYears = [...new Set(initData.map(mVal => mVal.year))];
    let temp = [];

    if (!numOfYears.length) {
      return;
    }

    initData = initData
      .map(mVal => ({
        month: mVal.month,
        year: parseInt(mVal.year),
        data: mVal.lipoData.map(mmVal => ({
          id: mmVal.mapId,
          mean: mmVal.mean
        }))
      }))
      .sort((a, b) => a.year - b.year);

    if (numOfYears.length > 1) {
      temp = [...d3Arr.group(initData, d => d.year)]
        .map(mVal => ({
          year: mVal[0],
          data: mVal[1]
            .map(mmVal => mmVal.data.map(mmmVal => mmmVal))
            .flat(Infinity)
        }))
        .map(m2Val => ({
          year: m2Val.year,
          data: [...d3Arr.group(m2Val.data, d2 => d2.id)].map(mm2Val => ({
            id: mm2Val[0],
            mean:
              mm2Val[1]
                .map(mmm2Val => mmm2Val.mean)
                .reduce((prev, curr) => prev + curr) / mm2Val[1].length
          }))
        }));
      initData = temp;
    }

    let newMap = map.mainMap;

    if (
      !d3
        .select("div.main-map-svg")
        .selectAll("div")
        .node()
    ) {
      d3.select("div.main-map-svg")
        .append("div")
        .attr("class", "sk-tooltip")
        .append("svg")
        .attr("height", 180)
        .append("g")
        .attr("transform", "translate(30,30)");
    }

    let svg = d3.select("svg#main-mapped");
    let svgH = svg.attr("height"),
      svgW = svg.attr("width");
    let geo = d3
      .geoMercator()
      .center([121.012, 14.602])
      .translate([svgH / 2, svgW / 2])
      .scale(1100000);
    let self = this;

    if (svg.selectAll("image").node()) {
      svg.selectAll("image").remove();
    }

    let colorScale = d3
      .scaleThreshold()
      .domain(d3.range(20, 100, 5))
      .range(choroColorValue);

    svg
      .selectAll("image")
      .data(newMap)
      .enter()
      .append("image")
      .attr("x", d => geo(d3.geoCentroid(d))[0] - 10)
      .attr("y", d => geo(d3.geoCentroid(d))[1] - 15)
      .style("cursor", "pointer")
      .attr("width", 15)
      .attr("height", 20)
      .attr("xlink:href", "https://image.flaticon.com/icons/svg/252/252025.svg")
      .on("click", function(d) {
        let pos = geo(d3.geoCentroid(d));
        let finalData = initData.map(mVal => ({
          ...mVal,
          data: mVal.data.filter(fVal => fVal.id === d.properties.ID_3)[0]
        }));

        let h = 115,
          w = 250;
        self.setCurrentSelected(d);
        d3.select("div.main-map-svg")
          .selectAll("div")
          .transition()
          .style("left", pos[0] + "px")
          .style("top", pos[1] - 65 + "px")
          .style("opacity", 1)
          .duration(300);

        let miniG = d3
          .select("div.main-map-svg")
          .selectAll("div")
          .select("g");

        let y = d3
          .scaleLinear()
          .domain([0, 70])
          .range([h, 0])
          .nice();

        let yAxis = d3
          .axisLeft()
          .ticks(6)
          .scale(y);

        if (miniG.selectAll("g").node()) {
          miniG.selectAll("g").remove();
        }

        miniG.append("g").call(yAxis);

        let x = d3
          .scaleBand()
          .domain(d3.range(0, finalData.length))
          .range([2, w]);
        let xAxis = d3
          .axisBottom()
          .scale(x)
          .tickFormat(d => {
            let name = finalData.map(m => m.month || m.year)[d];
            if (name < 13) {
              return new Date(name).toDateString().split(" ")[1];
            }
            return name;
          });

        miniG
          .append("g")
          .attr("transform", `translate(0,${h})`)
          .call(xAxis)
          .selectAll("text")
          .attr("text-anchor", "end")
          .attr("transform", "rotate(-35)translate(0,0)");

        if (miniG.selectAll("rect").node) {
          miniG.selectAll("rect").remove();
        }

        miniG
          .selectAll("rect")
          .data(finalData)
          .enter()
          .append("rect")
          .attr("y", h)
          .attr("height", 0)
          .attr("width", x.bandwidth() - 2)
          .attr("x", (d, i) => x(i))
          .attr("fill", d => colorScale(d.data.mean))
          .attr("cursor", "pointer")
          .transition()
          .attr("height", d => h - y(d.data.mean))
          .attr("y", d => y(d.data.mean))
          .duration(1000);

        if (miniG.selectAll("g.barText").node()) {
          miniG.selectAll("g.barText").remove();
        }

        miniG
          .append("g")
          .attr("class", "barText")
          .selectAll("text")
          .data(finalData)
          .enter()
          .append("text")
          .style("opacity", 0)
          .attr("height", d => h - y(d.data.mean))
          .attr("y", d => y(d.data.mean) - 5)
          .attr("x", (d, i) => x(i) + (x.bandwidth() - 2) / 2)
          .attr("text-anchor", "middle")
          .style("font-size", "10px")
          .text(function(d) {
            return d.data.mean.toFixed(1);
          })
          .transition()
          .style("opacity", 1)
          .delay(600)
          .duration(300);

        if (
          d3
            .select("div.sk-tooltip")
            .select("svg")
            .select("text.highText")
            .node()
        ) {
          d3.select("div.sk-tooltip")
            .select("svg")
            .select("text.highText")
            .remove();
        }

        d3.select("div.sk-tooltip")
          .select("svg")
          .append("text")
          .attr("class", "highText")
          .style("font-size", "18px")
          .style("opacity", 0)
          .text(d.properties.NAME_3)
          .attr("x", w / 2 + 20)
          .attr("y", 20)
          .attr("text-anchor", "middle")
          .transition()
          .style("opacity", 1)
          .duration(300)
          .delay(300);
      });
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

    if (!currMainData.length) {
      return;
    }
    let svg = d3.select("svg#main-mapped");
    let scale = d3.select("svg#main-mapped>g#map-scale");

    let reColorScale = d3
      .scaleThreshold()
      .domain(d3.range(20, 100, 5))
      .range(someColor);

    scale
      .selectAll("rect")
      .transition()
      .duration(300)
      .ease(d3.easeLinear)
      .attr("fill", d => reColorScale(d[0]));

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
    let newMap = map.mainMap;

    const {
      lipoMeanMapData,
      lipoMaxMapData,
      lipoMinMapData,
      choroColorValue
    } = this.state;

    let svg = d3.select("svg#main-mapped").node()
      ? d3.select("svg#main-mapped")
      : d3
          .select("div.main-map-svg")
          .append("svg")
          .attr("id", "main-mapped")
          .style("width", "100%")
          .style("height", "100%");
    let scale = d3.select("svg#main-mapped>g#map-scale").node()
      ? d3.select("svg#main-mapped>g#map-scale")
      : svg.append("g").attr("id", "map-scale");

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
      .data(newMap)
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
      colorValue,
      currLoc,
      currLA,
      currPop,
      radMean,
      radMax,
      radMin,
      showIcon,
      showIntensity,
      iconDisable,
      intensityDisable,
      colorDisabled,
      textureVal
    } = this.state;

    const tProps = {
      treeData,
      value: treeValue,
      onChange: this.treeChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: "Please select",
      allowClear: true,
      showSearch: true,
      dropdownStyle: {
        maxHeight: "40vh"
      },
      style: {
        width: "100%"
      },
      maxTagCount: 2,
      maxTagPlaceholder: args => `Too many to show.. (${args.length} items)`
    };
    const bProps = {
      treeData: brgyData,
      value: brgyValue,
      onChange: this.brgyChange,
      allowClear: true,
      showSearch: true,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: "Please select",
      dropdownStyle: {
        maxHeight: "40vh"
      },
      style: {
        width: "100%"
      },
      maxTagCount: 2,
      maxTagPlaceholder: args => `Too many to show.. (${args.length} items)`
    };
    let isColored = (
      <div>
        <div className="form-group">
          <h4>Color</h4>
          <Select
            style={{ width: "100%" }}
            defaultValue={colorValue}
            onChange={this.colorChange}
            disabled={colorDisabled}
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
        <Row>
          <Checkbox
            onChange={this.iconChange}
            checked={showIcon}
            disabled={iconDisable}
          >
            Show Area Information
          </Checkbox>
        </Row>
        <Row>
          <Checkbox
            onChange={this.intensityChange}
            checked={showIntensity}
            disabled={intensityDisable}
          >
            Highlight Radiance Intensity
          </Checkbox>
        </Row>
      </div>
    );

    if (textureVal !== "choropleth") {
      isColored = "";
    }

    const { mainData } = this.props;
    if (!mainData) {
      return <Redirect to="/map" />;
    }

    let niceMap = "";

    // switch (textureVal) {
    //   case "natural":
    //     niceMap = (
    //       <ReactMapGL
    //         {...viewport}
    //         mapboxApiAccessToken={"pk.eyJ1IjoiY2FybGRlbm5pcyIsImEiOiJjazIxZzl5Y3EwYzRjM2Nucm9tNHByMmxxIn0._MG8WyHvx4q4-ygT_o1SbA"}
    //         onViewportChange={viewport => this.setState({ viewport })}
    //       />
    //     );
    //     break;
    //   default:
    //     niceMap = "";
    // }

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
                  <TreeSelect {...tProps} />
                </div>

                <div className="form-group">
                  <h4>Area Coverage</h4>
                  <TreeSelect {...bProps} />
                </div>
                <div className="form-group">
                  <h4>Area Texture</h4>
                  <div style={{ width: "100%", margin: "10px 0" }}>
                    <Radio.Group
                      onChange={this.textureRadioChange}
                      size="small"
                      defaultValue="choropleth"
                      value={textureVal}
                      style={{ width: "100%" }}
                    >
                      <Radio.Button value="choropleth">Choropleth</Radio.Button>
                      <Radio.Button value="natural">Natural Earth</Radio.Button>
                      <Radio.Button value="roads">Roads</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
                {isColored}
              </div>
            </div>
          </div>
          <div className="main-map-svg" id="main-map-svg">
            <svg id="main-mapped" style={{ width: "100%", height: "100%" }}>
              <g id="map-scale" className="map-scale"></g>
            </svg>
            {niceMap}
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

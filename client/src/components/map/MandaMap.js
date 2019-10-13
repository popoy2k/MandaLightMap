import React, { Component, Fragment } from "react";
import NavBar from "../main/NavBar";
import { Icon, TreeSelect, Select } from "antd";
import { brgyData, treeData } from "./treeData";
import * as d3 from "d3";
import { feature as Feature } from "topojson-client";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMainMap } from "../../actions/auth";

const { SHOW_PARENT } = TreeSelect;
const { Option, OptGroup } = Select;

export class MandaMap extends Component {
  state = {
    treeValue: ["2019-All"],
    brgyValue: ["00-All"],
    textureValue: { key: "01-Choro" },
    colorValue: { key: "02-Purple" }
  };

  static propTypes = {
    getMainMap: PropTypes.func.isRequired,
    map: PropTypes.object
  };

  treeChange = value => this.setState({ treeValue: value });

  brgyChange = value => this.setState({ brgyValue: value });

  textureChange = value => this.setState({ textureValue: value });

  colorChange = value => this.setState({ colorValue: value });

  componentDidMount() {
    document.title = "Skótos - Light Pollution Map";
    console.log(this.props);
    let projection = d3.geoPath().projection();

    let path = (svgH, svgW) =>
      projection(
        d3
          .geoMercator()
          .center(
            [121.03, 14.578].translate([svgH / 2, svgW / 2]).scale(750000)
          )
      );

    let svg = d3
      .select("svg#main-mapped")
      .attr("width", "100%")
      .attr("height", "100%");

    let svgH = +svg.attr("height"),
      svgW = +svg.attr("width");
  }

  render() {
    const { treeValue, brgyValue, textureValue, colorValue } = this.state;

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
        width: 300
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
        width: 300
      },
      maxTagCount: 3,
      maxTagPlaceholder: args => `Too many to show.. (${args.length} items)`
    };
    let isColored = (
      <div className="form-group">
        <h4>Color</h4>
        <Select
          style={{ width: 300 }}
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
                    Mandaluyong City
                  </li>
                  <li title="Land Area">
                    <Icon type="area-chart" className="sk-icon-color" /> 1124.97
                    ha
                  </li>
                  <li title="Population">
                    <Icon type="team" className="sk-icon-color" /> 386,276
                  </li>
                  <li title="Light Intensity">
                    <Icon type="heat-map" className="sk-icon-color" /> Radiance
                    - W/cm2*sr
                    <ul>
                      <li></li>
                      <li>
                        51.23 <small className="secondary">Mean</small>
                      </li>
                      <li>
                        32.44 <small className="secondary">Max</small>
                      </li>
                      <li>
                        61.21 <small className="secondary">Min</small>
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
                    style={{ width: 300 }}
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
            <svg id="main-mapped"></svg>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  map: state.map
});

export default connect(
  mapStateToProps,
  { getMainMap }
)(MandaMap);

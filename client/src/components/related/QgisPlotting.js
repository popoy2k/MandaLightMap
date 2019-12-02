import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";
import P7Zip from "./philgis7zip.png";
import QGISBrgy from "./QgisBrgy.png";
import StringBuilder from "./StringBuilder.png";
import SaveAsQgis from "./SaveAsQgis.png";
import NewShp from "./NewShapeFile.png";

export class QgisPlotting extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">Using QGis for Plotting</span>
            <p>
              In this section we'll tackle how to use QGis to Plot area from
              shapefile. We'll be using PhilGIS data for this exercise. <br />
              <br />
              <ol>
                <li>
                  Visit and download{" "}
                  <a
                    href="http://philgis.org/country-barangay/country-barangays-file"
                    rel="noopener noreferrer"
                    className="sk-custom-link"
                    target="_blank"
                  >
                    PhilGIS Philippines by Baranggay Shapefile
                  </a>{" "}
                  the file should look like this. Then select{" "}
                  <span className="sk-strong">Barangays.shp</span> file.
                  <div className="article-img">
                    <img src={P7Zip} alt="Directory" />
                  </div>
                  <br />
                </li>
                <li>
                  Upon loading the file this what it looked like when loaded to
                  QGIS.
                  <div className="article-img">
                    <img src={QGISBrgy} alt="QGIS Loaded" />
                  </div>
                  <br />
                </li>
                <li>
                  Then press Ctrl + F to filter the map. Select{" "}
                  <span className="sk-strong">NAME_2</span> for the field and
                  its equal to <span className="sk-strong">Mandaluyong</span>.
                  (Note that you can choose other than Mandaluyong City)
                  <br />
                  <div className="article-img">
                    <img src={StringBuilder} alt="String Builder" />
                  </div>
                  <br />
                </li>
                <li>
                  Right Click the Layer then Save As.
                  <div className="article-img">
                    <img src={SaveAsQgis} alt="Save As Vector" />
                  </div>
                  <br />
                  This what it would look like.
                  <div className="article-img">
                    <img
                      src={NewShp}
                      rel="noopener noreferrer"
                      alt="New Shapefile"
                    />
                  </div>
                  <br />
                </li>
                <li>
                  You could use a{" "}
                  <a
                    href="https://mygeodata.cloud/converter/shp-to-topojson"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="sk-custom-link"
                  >
                    Online Converter
                  </a>{" "}
                  to convert Shapefile to TopoJSON.
                </li>
              </ol>
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default QgisPlotting;

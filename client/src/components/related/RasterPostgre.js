import React, { Component, Fragment } from "react";
import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

import FType from "./FileType.png";
import TarBall from "./tarball.png";
import Extracted from "./Extracted.png";
import Rasterize from "./rasterize.png";
import Loaded from "./Loaded.png";

export class RasterPostgre extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">
              Loading Raster Data to PostgreSQL
            </span>
            <p>
              This section would be intresting, because we would load the VIIRS
              (Visible Infrared Imaging Radiometer Suite) Data from PostgreSQL
              database.
            </p>
            <p>
              <ol>
                <li>
                  Download VIIRS data from{" "}
                  <a
                    href="https://ngdc.noaa.gov/eog/viirs/download_dnb_composites.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sk-custom-link"
                  >
                    National Oceanic and Atmospheric Administration (NOAA)
                  </a>
                  (Note that when choosing a tile number should be according
                  with your coordinates location, Since we're going to use{" "}
                  <span className="sk-strong">Mandaluyong City</span>{" "}
                  coordinates will be using Tile 3 (75N/060E) it covers a lot in
                  asia) We're using <span className="sk-strong">VCMCFG</span>{" "}
                  format to so that stray light wouldn't be accounted with the
                  computation.
                  <div className="article-img">
                    <img src={FType} alt="File Type" />
                  </div>
                  <br />
                </li>
                <li>
                  Now that we have the file we can extract the data using this
                  code. This code would specificly extract the data that has an
                  extension name{" "}
                  <span className="sk-strong">avg_rade9h.tif</span> this is a
                  GeoTIFF file that contains radiance that from it cover area
                  <div className="article-img">
                    <img src={TarBall} alt="Tar Ball" />
                  </div>
                  <div className="article-img">
                    <img src={Extracted} alt="Extracted" />
                  </div>
                  <br />
                </li>
                <li>
                  We'll be using{" "}
                  <a
                    href="https://postgis.net/docs/using_raster_dataman.htmlhttps://postgis.net/docs/using_raster_dataman.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sk-custom-link"
                  >
                    raster2pgsql
                  </a>{" "}
                  packge from PostGIS. It's responsible to migrate/reference the
                  data to the database so that it can be accessible using
                  GeoSpatial functions. (Make sure that your PostgreSQL database
                  uses the extension of postgis)
                  <div className="article-img">
                    <img src={Rasterize} alt="Rasterize Data" />
                  </div>
                  <br />
                  <div className="article-img">
                    <img src={Loaded} alt="Loaded Data" />
                  </div>
                  <br />
                </li>
              </ol>
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default RasterPostgre;

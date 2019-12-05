import React, { Component, Fragment } from "react";
import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";
import PHTopo from "./PH-TopoJSON.png";
export class introTopo extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">Introduction to TopoJSON</span>
            <p>
              <a
                href="https://github.com/topojson/topojson"
                className="sk-custom-link"
                rel="noopener noreferrer"
                target="_blank"
              >
                TopoJSON
              </a>{" "}
              is an extension of GeoJSON that encodes topology. Rather than
              representing geometries discretely, geometries in TopoJSON files
              are stitched together from shared line segments called arcs. This
              technique is similar to Matt Bloch’s MapShaper and the Arc/Info
              Export format, .e00. <br />
              <br /> TopoJSON eliminates redundancy, allowing related geometries
              to be stored efficiently in the same file. For example, the shared
              boundary between California and Nevada is represented only once,
              rather than being duplicated for both states. A single TopoJSON
              file can contain multiple feature collections without duplication,
              such as states and counties. Or, a TopoJSON file can efficiently
              represent both polygons (for fill) and boundaries (for stroke) as
              two feature collections that share the same arc mesh. See How To
              Infer Topology for a visual explanation of how TopoJSON works. See
              Command-Line Cartography for an introduction to TopoJSON and
              related tools. See TopoJSON Format Specification for the format
              specification. <br />
              <br /> To further reduce file size, TopoJSON can use quantized
              delta-encoding for integer coordinates. This is similar to
              rounding coordinate values (e.g., LilJSON), but with greater
              efficiency and control over loss of information. And like GeoJSON,
              TopoJSON files are easily modified in a text editor and amenable
              to gzip compression. <br />
              <br /> As a result, TopoJSON is substantially more compact than
              GeoJSON, frequently offering a reduction of 80% or more even
              without simplification. Yet encoding topology also has numerous
              useful applications for maps and visualization above! It allows
              topology-preserving shape simplification, which ensures that
              adjacent features remain connected after simplification; this
              applies even across feature collections, such as simultaneous
              consistent simplification of state and county boundaries. Topology
              can also be used for Dorling or hexagonal cartograms, as well as
              other techniques that need shared boundary information such as
              automatic map coloring.
            </p>
            <p>
              TopoJSON is vital in this system. because with its geospatial
              functions we can determine all surrounding coordinates that would
              create a polygon of each barangay in Mandaluyong city.
              <br />
              <br />
              An image below shows TopoJSON of Philippines by Region.
            </p>
            <div className="article-image">
              <img src={PHTopo} alt="Topo PH" />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default introTopo;

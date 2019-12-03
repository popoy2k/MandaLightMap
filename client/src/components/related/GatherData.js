import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

import PGInit from "./PGInit.png";
import QueryTool from "./QueryTool.png";
import GData from "./GatheredData.png";
export class GatherData extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">
              Gathering Data from PostgreSQL
            </span>
            <p>
              Now that we have loaded raster file into our database we could run
              query that helps us gather data from in it. We'll be using{" "}
              <a
                href="https://www.pgadmin.org/download/pgadmin-4-apt/"
                className="sk-custom-link"
                rel="noopener noreferrer"
                target="_blank"
              >
                PGAdmin4
              </a>{" "}
              for the Database Management Studio.
            </p>
            <p>
              <ol>
                <li>
                  Run and Navigate to your database for me its{" "}
                  <span className="sk-strong">CarlPostGIS</span> And to Schemas
                  > Tables > viirs_2015_01
                  <br />
                  <div className="article-img">
                    <img src={PGInit} alt="PG Init" />
                  </div>
                  <br />
                </li>
                <li>
                  Click the Query Tool to execute queries.
                  <div className="article-img">
                    <img src={QueryTool} alt="Query Tool" />
                  </div>
                  <br />
                </li>
                <li>
                  And on the Query Editor execute this query to be able
                  calculate the <span className="sk-strong">Mean</span>,{" "}
                  <span className="sk-strong">Min</span>,{" "}
                  <span className="sk-strong">Max</span>. (Note that the
                  coordinates here are from the TopoJSON file that gathered.)
                  <br />
                  <br />
                  <span className="sk-strong">
                    SELECT Sum(ST_Area(ST_Intersection((a.polyFromRast).geom,
                    a.polygon)) / ST_Area(a.polygon) * (a.polyFromRast).val) as
                    mean, Max((a.polyFromRast).val) as max,
                    Min((a.polyFromRast).val) as min FROM (SELECT
                    ST_DumpAsPolygons(ST_Clip(rast,
                    ST_Buffer(polygon,0.01),-3.40282346638529e+038, TRUE)) as
                    polyFromRast, polygon FROM public.viirs_2015_01,
                    ST_SetSRID(ST_GeomFromText('POLYGON((121.03040275722533
                    14.587462811127152,121.02987071625878
                    14.586449159957347,121.02874607681731
                    14.584431860754282,121.02803668886192
                    14.583081437320825,121.02636703184496
                    14.580090499494133,121.02575713122476
                    14.578930135655014,121.02569657371637
                    14.578720069787588,121.02561871406274 14.578399969418175,
                    121.02559708638117 14.578049859639131,121.0256403417443
                    14.577579712221558,121.02571820139795
                    14.577249608715602,121.02580903766052
                    14.577069552257807,121.02554517994541
                    14.577029539711631,121.02511695185039
                    14.577979837683323,121.02484876859896
                    14.578600032149058,121.02517750935877
                    14.579150204658985,121.02572685247057
                    14.580110505767221,121.02597773357675
                    14.580540640638619,121.02638433399021 14.581270869606339,
                    121.0267044236774 14.581801035843178,121.02709804748191
                    14.582531264810898,121.02748302021381
                    14.583218146853595,121.02794585259933
                    14.584041738429061,121.02819673370551
                    14.584461870163915,121.02832649979491
                    14.584711948577517,121.02870282145417 14.585372155589429,
                    121.02886286629777 14.585662246549209,121.0291959325939
                    14.586289109772641,121.02935165190118
                    14.586539188186244,121.02961118407998
                    14.586989329330729,121.02961550961629
                    14.587119370105803,121.02995290144874
                    14.58725941401742,121.03040275722533 14.587462811127152,
                    121.03040275722533 14.587462811127152))'),4326) polygon
                    WHERE ST_Intersects(ST_Buffer(polygon,0.01), rast)) a
                  </span>
                  <br />
                  <br />
                  <div className="article-img">
                    <img src={GData} alt="Gathered Data" />
                  </div>
                </li>
              </ol>
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default GatherData;

import React, { Component } from "react";
import { Affix, Menu, Tooltip } from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

export class SidePanel extends Component {
  state = {
    selected: null,
    defOpenKeys: null
  };

  componentDidMount() {
    const { pathname } = window.location;
    const { title, key, openKeys } = this.getInfo(pathname);
    document.title = `Skótos Related Studies - ${title}`;
    this.setState({ selected: [key], defOpenKeys: [openKeys] });
  }

  getInfo = pathname => {
    const parts = pathname.split("/");
    const main = parts[2];
    const sub = parts[4] || null;

    switch (main) {
      case "introduction":
        return { title: "Introduction", key: "1", openKeys: "1" };
      case "GIS":
        return {
          title: "Geographical Information System",
          openKeys: "Rel6",
          key: sub
        };
      default:
        return { title: "Introduction" };
    }
  };

  render() {
    const { selected, defOpenKeys } = this.state;
    if (selected && defOpenKeys) {
      return (
        <Affix offsetTop={10}>
          <div className="side-panel custom-related-panel">
            <Menu
              mode="inline"
              defaultOpenKeys={defOpenKeys}
              defaultSelectedKeys={selected}
              style={{ width: "260px" }}
            >
              <Menu.Item key="1">
                {" "}
                <Link to="/related/introduction" className="sublink">
                  Introduction
                </Link>{" "}
              </Menu.Item>
              <SubMenu key="Rel2" title={<span>Animal</span>}>
                <Menu.Item key="21">Animal 1</Menu.Item>
                <Menu.Item key="22">Animal 2</Menu.Item>
                <Menu.Item key="23">Animal 3</Menu.Item>
                <Menu.Item key="24">Animal 4</Menu.Item>
              </SubMenu>
              <SubMenu key="Rel3" title={<span>Human</span>}>
                <Menu.Item key="31">Human 1</Menu.Item>
                <Menu.Item key="32">Human 2</Menu.Item>
                <Menu.Item key="33">Human 3</Menu.Item>
                <Menu.Item key="34">Human 4</Menu.Item>
              </SubMenu>
              <SubMenu key="Rel4" title={<span>Energy</span>}>
                <Menu.Item key="41">Energy 1</Menu.Item>
                <Menu.Item key="42">Energy 2</Menu.Item>
                <Menu.Item key="43">Energy 3</Menu.Item>
                <Menu.Item key="44">Energy 4</Menu.Item>
              </SubMenu>
              <SubMenu key="Rel5" title={<span>Safety</span>}>
                <Menu.Item key="51">Safety 1</Menu.Item>
                <Menu.Item key="52">Safety 2</Menu.Item>
                <Menu.Item key="53">Safety 3</Menu.Item>
                <Menu.Item key="54">Safety 4</Menu.Item>
              </SubMenu>
              <SubMenu
                key="Rel6"
                title={
                  <Tooltip title="Geographical Information System">
                    <span>GIS</span>
                  </Tooltip>
                }
              >
                <Menu.Item key="61">
                  <Link to="/related/GIS/introtopo/61" className="sublink">
                    Introduction to TopoJSON
                  </Link>
                </Menu.Item>
                <Menu.Item key="62">
                  <Link to="/related/GIS/qgisplotting/62" className="sublink">
                    Using QGIS for Plotting
                  </Link>
                </Menu.Item>
                <Menu.Item key="63">
                  <Link
                    to="/related/GIS/postgresloadraster/63"
                    className="sublink"
                  >
                    Load Raster Data to PostgreSQL
                  </Link>
                </Menu.Item>
                <Menu.Item key="64">
                  <Link
                    to="/related/GIS/postgresloadraster/63"
                    className="sublink"
                  >
                    Gathering Data from PostgreSQL
                  </Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </Affix>
      );
    } else {
      return <div></div>;
    }
  }
}

export default SidePanel;

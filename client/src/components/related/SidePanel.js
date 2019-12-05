import React, { Component } from "react";
import { Affix, Menu, Tooltip, Icon, Drawer } from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

export class SidePanel extends Component {
  state = {
    selected: null,
    defOpenKeys: null,
    dVisible: false,
    cWidth: Math.max(window.innerWidth, document.documentElement.clientWidth)
  };

  componentDidMount() {
    const { pathname } = window.location;
    const { title, key, openKeys } = this.getInfo(pathname);
    document.title = `Skótos Related Studies - ${title}`;
    this.setState({ selected: [key], defOpenKeys: [openKeys] });
    window.addEventListener("resize", () => {
      this.setState({
        cWidth: Math.max(
          window.innerWidth,
          document.documentElement.clientWidth
        )
      });
    });
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
      case "safety":
        return {
          title: "Safety",
          openKeys: "Rel5",
          key: sub
        };
      case "energy":
        return {
          title: "Energy",
          openKeys: "Rel4",
          key: sub
        };
      case "health":
        return {
          title: "Health",
          openKeys: "Rel3",
          key: sub
        };
      case "animal":
        return {
          title: "Animal",
          openKeys: "Rel2",
          key: sub
        };
      default:
        return { title: "Introduction" };
    }
  };

  onClick = () => {
    this.setState({ dVisible: !this.state.dVisible });
  };

  onClose = () => this.setState({ dVisible: !this.state.dVisible });

  render() {
    const { selected, defOpenKeys, cWidth, dVisible } = this.state;
    let menu = "";
    if (selected && defOpenKeys) {
      if (cWidth > 1000) {
        menu = (
          <div className="side-panel custom-related-panel">
            <Menu
              mode="inline"
              defaultOpenKeys={defOpenKeys}
              defaultSelectedKeys={selected}
              style={{ width: "260px", marginBottom: "10px" }}
            >
              <Menu.Item key="1">
                {" "}
                <Link to="/related/introduction" className="sublink">
                  Introduction
                </Link>{" "}
              </Menu.Item>
              <SubMenu key="Rel2" title={<span>Animal</span>}>
                <Menu.Item key="21">
                  <Link
                    to="/related/animal/migratorybirds/21"
                    className="sublink"
                  >
                    Migratory Birds
                  </Link>
                </Menu.Item>
                <Menu.Item key="22">
                  <Link to="/related/animal/FLAP/22" className="sublink">
                    F.L.A.P
                  </Link>
                </Menu.Item>
                <Menu.Item key="23">
                  <Link
                    to="/related/animal/effectsreproduction/23"
                    className="sublink"
                  >
                    Effects in Reproduction
                  </Link>
                </Menu.Item>
                <Menu.Item key="24">
                  <Link to="/related/animal/WNV/24" className="sublink">
                    West Nile Virus
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Rel3" title={<span>Human</span>}>
                <Menu.Item key="31">
                  <Link
                    to="/related/health/melatoninproduction/31"
                    className="sublink"
                  >
                    Melatonin Production
                  </Link>
                </Menu.Item>
                <Menu.Item key="32">
                  <Link
                    to="/related/health/circadianrhtyhm/32"
                    className="sublink"
                  >
                    Disruption of Circadian Rhythm
                  </Link>
                </Menu.Item>
                <Menu.Item key="33">
                  <Link
                    to="/related/health/breastcancer/33"
                    className="sublink"
                  >
                    Breast Cancer
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Rel4" title={<span>Energy</span>}>
                <Menu.Item key="41">
                  <Link
                    to="/related/energy/lighttrespass/41"
                    className="sublink"
                  >
                    Light Trespass
                  </Link>
                </Menu.Item>
                <Menu.Item key="42">
                  <Link to="/related/energy/glare/42" className="sublink">
                    Glare
                  </Link>
                </Menu.Item>
                <Menu.Item key="43">
                  {" "}
                  <Link to="/related/energy/skyglow/43" className="sublink">
                    Sky Glow
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Rel5" title={<span>Safety</span>}>
                <Menu.Item key="51">
                  <Link
                    to="/related/safety/unproperlighting/51"
                    className="sublink"
                  >
                    Improper Lighting
                  </Link>
                </Menu.Item>
                <Menu.Item key="52">
                  {" "}
                  <Link
                    to="/related/safety/highlighttemp/52"
                    className="sublink"
                  >
                    High Light Temperature
                  </Link>
                </Menu.Item>
                <Menu.Item key="53">
                  {" "}
                  <Link
                    to="/related/safety/securityintegrity/53"
                    className="sublink"
                  >
                    Light Cause Security Integrity
                  </Link>
                </Menu.Item>
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
                  <Link to="/related/GIS/gatherdata/64" className="sublink">
                    Gathering Data from PostgreSQL
                  </Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        );
      } else {
        menu = (
          <div className="mobile-side-panel-div">
            <button className="article-mobile-btn" onClick={this.onClick}>
              <Icon type="menu" />
            </button>
          </div>
        );
      }

      return (
        <div>
          <Drawer
            placement="left"
            visible={dVisible}
            closable={false}
            onClose={this.onClose}
            width={300}
            style={{ zIndex: "3000" }}
          >
            <Menu
              mode="inline"
              defaultOpenKeys={defOpenKeys}
              defaultSelectedKeys={selected}
              style={{ width: "260px", marginBottom: "10px" }}
            >
              <Menu.Item key="1">
                {" "}
                <Link to="/related/introduction" className="sublink">
                  Introduction
                </Link>{" "}
              </Menu.Item>
              <SubMenu key="Rel2" title={<span>Animal</span>}>
                <Menu.Item key="21">
                  <Link
                    to="/related/animal/migratorybirds/21"
                    className="sublink"
                  >
                    Migratory Birds
                  </Link>
                </Menu.Item>
                <Menu.Item key="22">
                  <Link to="/related/animal/FLAP/22" className="sublink">
                    F.L.A.P
                  </Link>
                </Menu.Item>
                <Menu.Item key="23">
                  <Link
                    to="/related/animal/effectsreproduction/23"
                    className="sublink"
                  >
                    Effects in Reproduction
                  </Link>
                </Menu.Item>
                <Menu.Item key="24">
                  <Link to="/related/animal/WNV/24" className="sublink">
                    West Nile Virus
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Rel3" title={<span>Human</span>}>
                <Menu.Item key="31">
                  <Link
                    to="/related/health/melatoninproduction/31"
                    className="sublink"
                  >
                    Melatonin Production
                  </Link>
                </Menu.Item>
                <Menu.Item key="32">
                  <Link
                    to="/related/health/circadianrhtyhm/32"
                    className="sublink"
                  >
                    Disruption of Circadian Rhythm
                  </Link>
                </Menu.Item>
                <Menu.Item key="33">
                  <Link
                    to="/related/health/breastcancer/33"
                    className="sublink"
                  >
                    Breast Cancer
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Rel4" title={<span>Energy</span>}>
                <Menu.Item key="41">
                  <Link
                    to="/related/energy/lighttrespass/41"
                    className="sublink"
                  >
                    Light Trespass
                  </Link>
                </Menu.Item>
                <Menu.Item key="42">
                  <Link to="/related/energy/glare/42" className="sublink">
                    Glare
                  </Link>
                </Menu.Item>
                <Menu.Item key="43">
                  {" "}
                  <Link to="/related/energy/skyglow/43" className="sublink">
                    Sky Glow
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Rel5" title={<span>Safety</span>}>
                <Menu.Item key="51">
                  <Link
                    to="/related/safety/unproperlighting/51"
                    className="sublink"
                  >
                    Improper Lighting
                  </Link>
                </Menu.Item>
                <Menu.Item key="52">
                  {" "}
                  <Link
                    to="/related/safety/highlighttemp/52"
                    className="sublink"
                  >
                    High Light Temperature
                  </Link>
                </Menu.Item>
                <Menu.Item key="53">
                  {" "}
                  <Link
                    to="/related/safety/securityintegrity/53"
                    className="sublink"
                  >
                    Light Cause Security Integrity
                  </Link>
                </Menu.Item>
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
                  <Link to="/related/GIS/gatherdata/64" className="sublink">
                    Gathering Data from PostgreSQL
                  </Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Drawer>
          <div className="mobile-side-panel">
            <Affix offsetTop={10}>{menu}</Affix>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default SidePanel;

import React, { Component } from "react";
import { Affix, Menu, Tooltip } from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

export class SidePanel extends Component {
  state = {
    selected: ["1"]
  };
  componentDidMount() {
    const { pathname } = window.location;
    const { title, key } = this.getInfo(pathname);
    document.title = `Skótos Related Studies - ${title}`;
    this.setState({ selected: [key] });
  }

  getInfo = pathname => {
    const parts = pathname.split("/");
    const main = parts[1];
    // const sub = parts[2] || null;

    switch (main) {
      case "introduction":
        return { title: "Introduction", key: "1" };
      default:
        return { title: "Introduction", key: "1" };
    }
  };

  render() {
    const { selected } = this.state;
    return (
      <Affix offsetTop={10}>
        <div className="side-panel">
          <Menu
            mode="inline"
            defaultSelectedKeys={selected}
            style={{ width: "250px" }}
          >
            <Menu.Item key="1"> Introduction </Menu.Item>
            <SubMenu key="2" title={<span>Animal</span>}>
              <Menu.Item key="21">Animal 1</Menu.Item>
              <Menu.Item key="22">Animal 2</Menu.Item>
              <Menu.Item key="23">Animal 3</Menu.Item>
              <Menu.Item key="24">Animal 4</Menu.Item>
            </SubMenu>
            <SubMenu key="3" title={<span>Human</span>}>
              <Menu.Item key="31">Human 1</Menu.Item>
              <Menu.Item key="32">Human 2</Menu.Item>
              <Menu.Item key="33">Human 3</Menu.Item>
              <Menu.Item key="34">Human 4</Menu.Item>
            </SubMenu>
            <SubMenu key="4" title={<span>Energy</span>}>
              <Menu.Item key="41">Energy 1</Menu.Item>
              <Menu.Item key="42">Energy 2</Menu.Item>
              <Menu.Item key="43">Energy 3</Menu.Item>
              <Menu.Item key="44">Energy 4</Menu.Item>
            </SubMenu>
            <SubMenu key="5" title={<span>Safety</span>}>
              <Menu.Item key="51">Safety 1</Menu.Item>
              <Menu.Item key="52">Safety 2</Menu.Item>
              <Menu.Item key="53">Safety 3</Menu.Item>
              <Menu.Item key="54">Safety 4</Menu.Item>
            </SubMenu>
            <SubMenu
              key="6"
              title={
                <Tooltip title="Geographical Information System">
                  <span>GIS</span>
                </Tooltip>
              }
            >
              <Menu.Item key="61">
                <Link to="/related/GIS/" className="sublink">
                  Introduction to TopoJSON
                </Link>
              </Menu.Item>
              <Menu.Item key="62">G.I.S 2</Menu.Item>
              <Menu.Item key="63">G.I.S 3</Menu.Item>
              <Menu.Item key="64">G.I.S 4</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </Affix>
    );
  }
}

export default SidePanel;

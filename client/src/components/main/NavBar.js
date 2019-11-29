import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Drawer, Icon } from "antd";

export class NavBar extends Component {
  state = {
    visible: false
  };

  showDrawer = () => this.setState({ visible: true });

  onClose = () => this.setState({ visible: false });
  componentDidMount() {
    let nav = document.querySelector("nav");

    if (nav) {
      if (window.scrollY > 50) {
        nav.classList.add("black");
      } else {
        nav.classList.remove("black");
      }
    }
    window.addEventListener("scroll", function() {
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add("black");
        } else {
          nav.classList.remove("black");
        }
      }
    });
  }

  render() {
    return (
      <header>
        <nav>
          <div className="logo">Skótos</div>
          <div className="drawerBtn">
            <button className="dbtn" onClick={this.showDrawer}>
              <Icon type="menu" />
            </button>
            {/* <Button
              type="primary"
              onClick={this.showDrawer}
              visible={!this.state.visible}
              icon="menu"
              ghost
            ></Button> */}
          </div>
          <Drawer
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            style={{ zIndex: "3000", padding: "0" }}
          >
            <ul className="drawerUL">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/related/introduction">Related Studies</Link>
              </li>
              <li>
                <Link to="/map">Light Pollution Map</Link>
              </li>
              <li>
                <Link to="/auth/login">For Developer</Link>
              </li>
            </ul>
          </Drawer>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/related/introduction">Related Studies</Link>
            </li>
            <li>
              <Link to="/map">Light Pollution Map</Link>
            </li>
            <li>
              <Link to="/auth/login">For Developer</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default NavBar;

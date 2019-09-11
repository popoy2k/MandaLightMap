import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
export class NavBar extends Component {
  constructor(props) {
    super(props);
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        document.querySelector("nav").classList.add("black");
      } else {
        document.querySelector("nav").classList.remove("black");
      }
    });
  }

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <header>
          <nav className="">
            <div className="logo">Skótos</div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Health Concern</Link>
              </li>
              <li>
                <Link to="/">Statistics</Link>
              </li>
              <li>
                <Link to="/">About Us</Link>
              </li>
            </ul>
          </nav>
        </header>
      </Fragment>
    );
  }
}

export default NavBar;

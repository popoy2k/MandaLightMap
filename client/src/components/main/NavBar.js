import React, { Component, Fragment } from "react";

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
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Health Concern</a>
              </li>
              <li>
                <a href="#">Statistics</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
            </ul>
          </nav>
        </header>
      </Fragment>
    );
  }
}

export default NavBar;

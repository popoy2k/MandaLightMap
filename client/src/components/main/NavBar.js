import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NavBar extends Component {
  componentDidMount() {
    window.addEventListener("scroll", function() {
      let nav = document.querySelector("nav");

      if (window.scrollY > 50) {
        nav.classList.add("black");
      } else {
        nav.classList.remove("black");
      }
    });
  }

  render() {
    return (
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

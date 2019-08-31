import React, { Component, Fragment } from "react";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    window.addEventListener("scroll", e => {
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
        <nav className="">
          <div className="logo">LOGO</div>
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
              <a href="#" className="active">
                About Us
              </a>
            </li>
          </ul>
        </nav>
        <section className="bg-frst"></section>
        <section className="content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            nobis suscipit fugit omnis deleniti. Quasi optio ducimus
            exercitationem dolor ullam suscipit corporis. Provident aspernatur,
            ratione quasi quo at dolorem unde voluptatibus possimus ipsa hic
            placeat eveniet sit! Iste eaque voluptates tempora doloribus labore
            ipsa repudiandae! Tempore esse nobis asperiores voluptatum?
          </p>
        </section>
      </Fragment>
    );
  }
}

export default NavBar;

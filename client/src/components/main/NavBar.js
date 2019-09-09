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
                <a href="#" className="active">
                  About Us
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <section className="bg-frst">
          <h1>Mandaluyong City: Light Pollution </h1>
          <div className="content-msg">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              mollitia minus reprehenderit earum dignissimos praesentium ullam!
              Ullam perspiciatis incidunt reprehenderit est exercitationem eius
              dicta. Alias consequatur aliquid inventore incidunt repellendus
              dolor voluptates. Laudantium harum atque, maiores voluptatibus
              saepe aperiam, tenetur minus sapiente doloremque itaque placeat.
              Fuga quae rerum sit, corporis ex numquam perspiciatis
              reprehenderit dolorum sequi fugit unde quidem nesciunt ipsa a
              voluptates. Nobis harum nihil ipsam quae quo fugit numquam modi
              dolorum necessitatibus odio, molestias in dignissimos voluptate
              doloremque incidunt culpa placeat ducimus temporibus! Veniam
              alias, inventore cumque fuga, tenetur modi qui tempore iusto iste
              deserunt dolores excepturi distinctio.
            </p>
          </div>
        </section>
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

import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import NavBar from "./NavBar";

export class login extends Component {
  constructor(props) {
    super(props);
    document.title = "Skótos - Login";
  }

  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    this.setState({ email: "", password: "" });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Fragment>
        <NavBar />
        <div>
          <section className="bg-frst">
            <div className="left-brand">
              <h1>Skótos</h1>
              <hr />
              <div className="left-brand-sub-contianer">
                <p>
                  &nbsp;&nbsp; The word "
                  <strong>
                    <i>Skótos</i>
                  </strong>
                  " is a greek word that means Bright. This website is purposely
                  made to help researchers, students and other individuals that
                  seek for "
                  <strong>
                    <i>Mandaluyong City</i>
                  </strong>
                  " Light Pollution Data Statistics. And also this website
                  provide articles, researches, study related with light
                  pollution that can help to their own projects.
                </p>
                <button className="csp-btn">Read more...</button>
              </div>
            </div>
          </section>
          <section className="content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium nobis suscipit fugit omnis deleniti. Quasi optio
              ducimus exercitationem dolor ullam suscipit corporis. Provident
              aspernatur, ratione quasi quo at dolorem unde voluptatibus
              possimus ipsa hic placeat eveniet sit! Iste eaque voluptates
              tempora doloribus labore ipsa repudiandae! Tempore esse nobis
              asperiores voluptatum?
            </p>
          </section>
          <div
            className="d-flex align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="container">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 offset-md-3">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={email}
                          autoComplete="off"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input
                          type="password"
                          name="password"
                          autoComplete="off"
                          value={password}
                          className="form-control"
                          onChange={this.onChange}
                        />
                      </div>
                      <button className="btn btn-block btn-outline-primary">
                        Login
                      </button>
                    </form>
                    <div className="d-block justify-content-left pt-2">
                      <Link to="/register" className="cLink">
                        Don't have an account yet ?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default login;

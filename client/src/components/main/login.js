import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import NavBar from "./NavBar";

export class login extends Component {
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
        <div className="d-flex align-items-center" style={{ height: "100vh" }}>
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
      </Fragment>
    );
  }
}

export default login;

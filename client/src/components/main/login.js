import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as GLogo } from "./GoogleLogo.svg";
import { ReactComponent as GitLogo } from "./Github.svg";
export class login extends Component {
  componentDidMount() {
    document.title = "Skótos - Sign in";
  }

  render() {
    return (
      <Fragment>
        <div className="d-flex align-items-center" style={{ height: "100vh" }}>
          <div className="container">
            <div className="sk-container login-container">
              <h1>Sign in</h1>
              <div className="sk-flex">
                <div className="sk-third-party">
                  <Link to="/" className="custom-sign-in GLink">
                    <GLogo />
                    Google
                  </Link>
                  <Link to="/" className="custom-sign-in GitLink">
                    {" "}
                    <GitLogo />
                    Github
                  </Link>
                </div>
                <div className="sk-manual">
                  <form method="POST">
                    <input
                      type="email"
                      placeholder="Email"
                      className="sk-form-control"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="sk-form-control"
                    />
                    <button className="sk-btn-main">Sign in</button>
                  </form>
                  <Link to="/register" className="muted-link">
                    {" "}
                    Don't have an account yet?{" "}
                  </Link>
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

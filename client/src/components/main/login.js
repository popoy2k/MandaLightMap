import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { signinUser } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { ReactComponent as GLogo } from "./GoogleLogo.svg";
import { ReactComponent as GitLogo } from "./Github.svg";
export class login extends Component {
  constructor(props) {
    super(props);
    document.title = "Skótos - Sign in";

    this.state = {
      email: "",
      password: "",
      disabled: ""
    };
  }

  static propTypes = {
    signinUser: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      this.props.signinUser({ email, password });
      this.setState({ password: "", disabled: "disabled" });
    }
  };

  render() {
    const { email, password, disabled } = this.state;
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
                  <form method="POST" onSubmit={this.onSubmit}>
                    <input
                      type="email"
                      placeholder="Email"
                      className={`sk-form-control ${disabled}`}
                      name="email"
                      value={email}
                      onChange={this.onChange}
                      disabled={disabled ? true : false}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className={`sk-form-control ${disabled}`}
                      name="password"
                      value={password}
                      onChange={this.onChange}
                      disabled={disabled ? true : false}
                    />
                    <div className="forget-pass">
                      <Link to="/">Forget password?</Link>
                    </div>

                    <button
                      className={`sk-btn-main ${disabled}`}
                      disabled={disabled ? true : false}
                    >
                      Sign in
                    </button>
                  </form>
                  <Link to="/auth/register" className="muted-link">
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

export default connect(
  null,
  { signinUser }
)(login);

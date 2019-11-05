import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { signinUser } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { GoogleLogin } from "react-google-login";
import GitHubLogin from "react-github-login";

import { ReactComponent as GLogo } from "./GoogleLogo.svg";
import { ReactComponent as GitLogo } from "./Github.svg";

function GitLogoComponent(props) {
  return (
    <span>
      <GitLogo className={props.className} />
      {props.text}
    </span>
  );
}

export class login extends Component {
  state = {
    email: "",
    password: "",
    disabled: ""
  };

  componentDidMount() {
    document.title = "Skótos - Sign in";
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

  onThirdPartySignIn = value => {
    console.log(value);
  };

  render() {
    const responseGoogle = response => {
      this.onThirdPartySignIn(response);
    };

    const responseGithub = response => {
      this.onThirdPartySignIn(response);
    };

    const { email, password, disabled } = this.state;
    return (
      <Fragment>
        <div className="d-flex align-items-center" style={{ height: "100vh" }}>
          <div className="container">
            <div className="sk-container login-container">
              <h1>Sign in</h1>
              <div className="sk-flex">
                <div className="sk-third-party">
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    render={renderProps => (
                      <button
                        className="custom-sign-in GLink"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <GLogo className="sk-svg-middle" />
                        Google
                      </button>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                  <GitHubLogin
                    clientId={process.env.REACT_APP_GITHUB_CLIENT_ID}
                    onSuccess={responseGithub}
                    onFailure={responseGithub}
                    className="custom-sign-in GitLink"
                    buttonText={
                      <GitLogoComponent
                        className="sk-svg-middle"
                        text="GitHub"
                      />
                    }
                  />
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
                      <Link to="/auth/ufor">Forget password?</Link>
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

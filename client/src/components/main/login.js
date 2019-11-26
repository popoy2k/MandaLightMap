import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";

import { signinUser, googleSignIn, verifyToken } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { GoogleLogin } from "react-google-login";

import { ReactComponent as GLogo } from "./GoogleLogo.svg";

export class login extends Component {
  state = {
    email: "",
    password: "",
    disabled: ""
  };

  componentDidMount() {
    document.title = "Skótos - Sign in";
    const { token, isAuthenticated } = this.props.auth;

    if (token !== null && isAuthenticated === null) {
      this.props.verifyToken();
    }
  }

  static propTypes = {
    signinUser: PropTypes.func.isRequired,
    googleSignIn: PropTypes.func.isRequired,
    verifyToken: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(null)])
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
    const googleObj = value.profileObj;
    this.props.googleSignIn(googleObj);
  };

  render() {
    const { user } = this.props;

    if (user) {
      switch (user.role) {
        case "admin":
          return <Redirect to="/home/admin" />;
        case "user":
          return <Redirect to="/home/admin" />;
        default:
          return;
      }
    }

    const responseGoogle = response => {
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

                  <span className="sk-or">Or</span>
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

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  signinUser,
  googleSignIn,
  verifyToken
})(login);

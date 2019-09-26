import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signupUser } from "../../actions/auth";
import PropTypes from "prop-types";

export class register extends Component {
  constructor(props) {
    super(props);
    document.title = "Skótos - Sign up";

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      disabled: ""
    };
  }
  static propTypes = {
    signupUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { firstName, lastName, email, password, rePassword } = this.state;
    if (firstName && lastName && email && password === rePassword) {
      this.props.signupUser({
        firstName,
        lastName,
        email,
        password,
        rePassword
      });
      this.setState({ password: "", rePassword: "", disabled: "disabled" });
    }
  };
  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      rePassword,
      disabled
    } = this.state;

    return (
      <Fragment>
        <div className="d-flex align-items-center" style={{ height: "100vh" }}>
          <div className="container">
            <div className="sk-container">
              <h1>Sign up</h1>
              <div className="sk-flex">
                <div className="sk-manual">
                  <form method="POST" onSubmit={this.onSubmit}>
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={this.onChange}
                      placeholder="First Name"
                      className={`sk-form-control ${disabled}`}
                      disabled={disabled ? true : false}
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={this.onChange}
                      placeholder="Last Name"
                      className={`sk-form-control ${disabled}`}
                      disabled={disabled ? true : false}
                    />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.onChange}
                      placeholder="Email"
                      className={`sk-form-control ${disabled}`}
                      disabled={disabled ? true : false}
                    />
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.onChange}
                      placeholder="Password"
                      className={`sk-form-control ${disabled}`}
                      disabled={disabled ? true : false}
                    />
                    <input
                      type="password"
                      name="rePassword"
                      value={rePassword}
                      onChange={this.onChange}
                      placeholder="Re-type Password"
                      className={`sk-form-control ${disabled}`}
                      disabled={disabled ? true : false}
                    />
                    <button
                      type="submit"
                      className={`sk-btn-main ${disabled}`}
                      disabled={disabled ? true : false}
                    >
                      Sign up
                    </button>
                  </form>
                  <Link to="/login" className="muted-link">
                    Have an account?
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
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { signupUser }
)(register);

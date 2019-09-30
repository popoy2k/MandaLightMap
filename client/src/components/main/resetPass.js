import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetPassFinal } from "../../actions/auth";
export class resetPass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      rePassword: ""
    };

    document.title = "Skótos - Reset Password";
  }

  componentDidUpdate(prevProps) {
    const { reset } = this.props;
    if (prevProps.reset !== reset) {
      console.log(reset);
    }
  }

  static propTypes = {
    resetPassFinal: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { token } = this.props.match.params;
    const { password, rePassword } = this.state;
    if (token && password && rePassword && password === rePassword) {
      this.props.resetPassFinal({ token, password, rePassword });
      this.setState({ password: "", rePassword: "" });
    }
  };

  render() {
    const { password, rePassword } = this.state;
    return (
      <div className="d-flex align-items-center" style={{ height: "100vh" }}>
        <div className="container">
          <div className="sk-container">
            <h1>Reset Password</h1>
            <p>
              Hi There, You are now able to change your password. Please
              remember your new password.{" "}
            </p>
            <form method="POST" onSubmit={this.onSubmit} className="sk-form">
              <input
                type="password"
                name="password"
                id="password"
                className="sk-form-control"
                onChange={this.onChange}
                value={password}
                placeholder="New Password"
              />
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                className="sk-form-control"
                onChange={this.onChange}
                value={rePassword}
                placeholder="Re-type Password"
              />
              <button type="submit" className="sk-btn-main">
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reset: state.reset
});
export default connect(
  mapStateToProps,
  { resetPassFinal }
)(resetPass);

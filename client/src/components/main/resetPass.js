import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetPassFinal } from "../../actions/auth";
import { Link } from "react-router-dom";
import { Alert } from "antd";
export class resetPass extends Component {
  state = {
    password: "",
    rePassword: "",
    disabled: "",
    notif: ""
  };

  componentDidMount() {
    document.title = "Skótos - Reset Password";
  }

  componentDidUpdate(prevProps) {
    const { reset } = this.props;
    if (prevProps.reset !== reset) {
      const initNotif = (
        <Alert
          type={reset.status}
          message={reset.status === "success" ? "Successful" : "Error"}
          description={reset.msg}
          showIcon
        />
      );
      this.setState({ notif: initNotif, disabled: "" });
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
    const { password, rePassword, disabled, notif } = this.state;

    return (
      <div className="d-flex align-items-center" style={{ height: "100vh" }}>
        <div className="container">
          <div className="sk-alert reset-container">{notif}</div>
          <div className="sk-container reset-container">
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
                disabled={disabled}
                className="sk-form-control"
                onChange={this.onChange}
                value={password}
                placeholder="New Password"
              />
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                disabled={disabled}
                className="sk-form-control"
                onChange={this.onChange}
                value={rePassword}
                placeholder="Re-type Password"
              />
              <button type="submit" disabled={disabled} className="sk-btn-main">
                Reset
              </button>
              <br />
              <Link to="/auth/login" className="muted-link">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reset: state.reset.data
});
export default connect(mapStateToProps, { resetPassFinal })(resetPass);

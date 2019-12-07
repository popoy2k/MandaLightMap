import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { requestReset } from "../../actions/auth";
import { Link } from "react-router-dom";
import { Alert } from "antd";

export class forgetPass extends Component {
  state = {
    email: "",
    disabled: "",
    notif: ""
  };
  componentDidMount() {
    document.title = "Skótos - Forget Password";
  }

  componentDidUpdate(prevProps) {
    const { reset } = this.props;
    if (prevProps.reset !== reset) {
      const initNotif = (
        <Alert
          type={reset.status}
          message={reset.status === "success" ? "Successful" : "Error"}
          description={
            reset.status === "success"
              ? `An reset password link is sent to ${reset.data.email}`
              : reset.msg
          }
          showIcon
        />
      );
      this.setState({ notif: initNotif, disabled: "" });
    }
  }

  static propTypes = {
    requestReset: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    if (email) {
      this.props.requestReset({ email });
      this.setState({ email: "", disabled: "disabled" });
    }
  };
  render() {
    const { email, disabled, notif } = this.state;
    return (
      <div className="d-flex align-items-center" style={{ height: "100vh" }}>
        <div className="container">
          <div className="sk-alert forget-pass-container">{notif}</div>
          <div className="forget-pass-container sk-container">
            <p>
              Forgotten your password? <br /> Please enter the email address
              that you used to sign up, and a link will be sent.
            </p>
            <form method="POST" onSubmit={this.onSubmit}>
              <input
                type="email"
                className="sk-form-control"
                placeholder="Enter email here."
                onChange={this.onChange}
                name="email"
                disabled={disabled}
                value={email}
              />
              <button type="submit" className="sk-btn-main" disabled={disabled}>
                Reset Password
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

export default connect(mapStateToProps, { requestReset })(forgetPass);

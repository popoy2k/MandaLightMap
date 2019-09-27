import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { requestReset } from "../../actions/auth";
import { Link } from "react-router-dom";

export class forgetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
    document.title = "Skótos - Forget Password";
  }

  componentDidUpdate(prevProps) {
    const { reset } = this.props;
    if (prevProps.reset !== reset) {
      console.log(reset);
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
      this.setState({ email: "" });
    }
  };
  render() {
    const { email } = this.state;
    return (
      <div className="d-flex align-items-center" style={{ height: "100vh" }}>
        <div className="container">
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
                value={email}
              />
              <button type="submit" className="sk-btn-main">
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
  reset: state.reset
});

export default connect(
  mapStateToProps,
  { requestReset }
)(forgetPass);

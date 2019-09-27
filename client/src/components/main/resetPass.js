import React, { Component } from "react";

export class resetPass extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="d-flex align-items-center" style={{ height: "100vh" }}>
        <div className="container">
          <div className="sk-containter">
            <h1>Reset Password</h1>
            <form method="POST">
              <input
                type="password"
                name="password"
                id="password"
                className="sk-form-control"
                placeholder="New Password"
              />
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                className="sk-form-control"
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

export default resetPass;

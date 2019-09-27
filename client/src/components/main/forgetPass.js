import React, { Component } from "react";
import axios from "axios";

export class forgetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
    document.title = "Skótos - Forget Password";
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const { email } = this.state;
    if (email) {
      axios
        .post("/auth/user/forget/request", JSON.stringify({ email }), {
          headers: { "Content-Type": "application/json" }
        })
        .then(result => console.log(result))
        .catch(console.error);
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
              Forgotten your password? Please enter the email address that you
              used to sign up, and a link will be sent.
            </p>
            <form method="POST" onSubmit={this.onSubmit}>
              <input
                type="email"
                className="sk-form-control"
                placeholder="Enter email here."
                onChage={this.onChange}
                name="email"
                value={email}
              />
              <button type="submit" className="sk-btn-main">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default forgetPass;

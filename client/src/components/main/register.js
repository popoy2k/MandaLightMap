import React, { Component } from "react";
import { Link } from "react-router-dom";

export class register extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password1: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    this.setState({ email: "", password: "" });
  };
  render() {
    const { firstname, lastname, email, password, password1 } = this.state;
    return (
      <div className="d-flex align-items-center" style={{ height: "100vh" }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 offset-md-3">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="">First Name</label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        onChange={this.onChange}
                        value={firstname}
                        name="firstname"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Last Name</label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        onChange={this.onChange}
                        value={lastname}
                        name="lastname"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        autoComplete="off"
                        className="form-control"
                        onChange={this.onChange}
                        value={email}
                        name="email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Password</label>
                      <input
                        type="password"
                        autoComplete="off"
                        className="form-control"
                        onChange={this.onChange}
                        value={password}
                        name="password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Re-type Password</label>
                      <input
                        type="password"
                        autoComplete="off"
                        className="form-control"
                        onChange={this.onChange}
                        value={password1}
                        name="password1"
                      />
                    </div>
                    <button
                      className="btn btn-block btn-outline-success"
                      type="submit"
                    >
                      Register
                    </button>
                  </form>
                  <div className="d-block justify-content-left pt-2">
                    <Link to="/" className="cLink">
                      Have an account ?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default register;

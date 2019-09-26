import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export class userActivate extends Component {
  constructor(props) {
    super(props);
    document.title = "Skótos - User Activation";

    this.state = {
      email: "",
      firstName: "",
      error: null
    };
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    axios
      .get(`/auth/user/activation/${token}`, null, {
        headers: { "Content-Type": "application/json" }
      })
      .then(resData => {
        console.log(resData);
        const { email, firstName } = resData.data.data;
        this.setState({ email, firstName });
      })
      .catch(retError => {
        console.log(retError.response);
        const { msg } = retError.response.data;
        this.setState({ error: msg });
      });
  }
  render() {
    const { email, firstName } = this.state;
    return (
      <Fragment>
        <div className="d-flex align-items-center" style={{ height: "100vh" }}>
          <div className="container">
            <div className="sk-container">
              <h1 style={{ paddingTop: "10vh" }}>Congratulations!</h1>
              <span className="sk-badge">{email}</span>
              <p style={{ paddingTop: "10vh" }}>
                Hi {firstName}, welcome to <strong>Skótos</strong> Web
                Application by activating your account you have access to our
                statistical data. Enjoy!
              </p>
              <Link to="/auth/login" className="sk-custom-btn">
                Login na!{" "}
                <span role="img" aria-label="Smiley">
                  😄
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default userActivate;

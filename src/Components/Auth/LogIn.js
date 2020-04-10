import React from "react";
import { firebaseAuth } from "./FirebaseInit";
import { navigate } from "@reach/router";
import GoogleSignIn from "./GoogleSignIn";
import FacebookSignIn from "./FacebookSignIn";

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      loginEmail: "",
      loginPassword: "",
      error: null,
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    firebaseAuth
      .auth()
      .signInWithEmailAndPassword(
        this.state.loginEmail,
        this.state.loginPassword
      )
      .then((cred) => {
        console.log(cred);
        navigate("/");
      })
      .catch((err) => {
        this.setState({ error: err.message });
      });
  };

  getErr = (err) => {
    this.setState({ error: err });
  };

  render() {
    return (
      <div className="auth container">
        <form className="auth form" onSubmit={this.handleSubmit}>
          <h3>Log In to Music-DB</h3>
          <input
            className="auth input"
            name="loginEmail"
            id="loginEmail"
            type="email"
            placeholder="E-mail"
            required
            onChange={this.handleChange}
          ></input>
          <input
            className="auth input"
            name="loginPassword"
            id="loginPassword"
            type="password"
            placeholder="Password"
            required
            onChange={this.handleChange}
          ></input>
          {this.state.error ? (
            <span className="error">{this.state.error}</span>
          ) : null}
          <button className="auth submit" type="submit">
            Log In
          </button>
          <p>
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
          <a href="/forgotPassword">Forgot your password? </a>

          <FacebookSignIn sendErr={this.getErr} />
          <GoogleSignIn sendErr={this.getErr} />
        </form>
      </div>
    );
  }
}

export default LogIn;

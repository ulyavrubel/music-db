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
      <div className="auth-container">
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <h3 className="auth-form__header">Log In to Music-DB</h3>
          <input
            className="auth-form__input"
            name="loginEmail"
            id="loginEmail"
            type="email"
            placeholder="E-mail"
            required
            onChange={this.handleChange}
          ></input>
          <input
            className="auth-form__input"
            name="loginPassword"
            id="loginPassword"
            type="password"
            placeholder="Password"
            required
            onChange={this.handleChange}
          ></input>
          {this.state.error ? (
            <span className="auth-error">{this.state.error}</span>
          ) : null}
          <button className="btn btn-black" type="submit">
            Log In
          </button>
          <p className="auth-form__paragraph">
            Don’t have an account?{" "}
            <a className="auth-form__link" href="/signup">
              Sign Up
            </a>
          </p>
          <a className="auth-form__link" href="/forgotPassword">
            Forgot your password?{" "}
          </a>
          <FacebookSignIn sendErr={this.getErr} />
          <GoogleSignIn sendErr={this.getErr} />
        </form>
      </div>
    );
  }
}

export default LogIn;

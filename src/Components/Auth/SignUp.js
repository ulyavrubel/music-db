import React from "react";
import { firebaseAuth } from "./FirebaseInit";
import { navigate } from "@reach/router";
import GoogleSignIn from "./GoogleSignIn";
import FacebookSignIn from "./FacebookSignIn";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      signupUsername: "",
      signupEmail: "",
      signupPassword: "",
      signupConfirmPassword: "",
      showErr: false,
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
    if (this.state.signupPassword === this.state.signupConfirmPassword) {
      firebaseAuth
        .auth()
        .createUserWithEmailAndPassword(
          this.state.signupEmail,
          this.state.signupPassword
        )
        .then((cred) => {
          console.log(cred);
          navigate("/");
          return cred.user.updateProfile({
            displayName: this.state.signupUsername,
          });
        })
        .catch((err) => {
          console.log(err.message);
          this.setState({ error: err.message });
        });
    } else {
      this.setState({ showErr: true });
    }
  };

  getErr = (err) => {
    this.setState({ error: err });
  };

  render() {
    return (
      <div className="auth container">
        <form className="auth form signup" onSubmit={this.handleSubmit}>
          <h3>Create new MusicDB account</h3>
          <input
            className="auth input"
            name="signup-username"
            id="signupUsername"
            type="text"
            placeholder="Username"
            required
            onChange={this.handleChange}
          ></input>
          <input
            className="auth input"
            name="signup-email"
            id="signupEmail"
            type="email"
            placeholder="E-mail"
            required
            onChange={this.handleChange}
          ></input>
          <input
            className="auth input"
            name="signup-password"
            id="signupPassword"
            type="password"
            placeholder="Password"
            required
            onChange={this.handleChange}
          ></input>
          <input
            className="auth input"
            name="signup-confirm-password"
            id="signupConfirmPassword"
            type="password"
            placeholder="Confirm password"
            required
            onChange={this.handleChange}
          ></input>
          {this.state.showErr ? (
            <span className="error">Passwords do not match</span>
          ) : null}
          {this.state.error ? <span>{this.state.error}</span> : null}
          <button className="auth submit" type="submit">
            Create account
          </button>

          <p>
            Already have an account? <a href="/login">Log In</a>
          </p>

          <FacebookSignIn sendErr={this.getErr} />
          <GoogleSignIn sendErr={this.getErr} />
        </form>
      </div>
    );
  }
}

export default SignUp;

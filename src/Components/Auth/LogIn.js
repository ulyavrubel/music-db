import React from "react";
import { firebaseAuth, provider } from "./FirebaseInit";
import { navigate } from "@reach/router";

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      loginEmail: "",
      loginPassword: "",
      signed: false,
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
        this.setState({ signed: true });
        console.log(cred);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.code);
        this.setState({ error: err.message });
      });
  };

  handleGoogleSignUp = () => {
    firebaseAuth
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        this.setState({ signed: true });
      })
      .catch(function (err) {
        this.setState({ error: err.message });
        console.log(err.message);
      });
  };

  render() {
    return (
      <div className="auth container">
        <form
          className="auth form"
          onSubmit={this.handleSubmit}
          // onSubmit={async (event) => {
          //   const user = await this.handleSubmit(event);
          //   console.log(user);
          //   if (this.state.signed) {
          //     this.setState({ signed: false });
          //     navigate("/");
          //   }
          // }}
        >
          <h3>Log In to Music-DB</h3>
          <input
            className="auth input"
            name="login-email"
            id="loginEmail"
            type="email"
            placeholder="E-mail"
            required
            onChange={this.handleChange}
          ></input>
          <input
            className="auth input"
            name="loginPassword"
            id="login-password"
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
          <button className="auth submit facebook" type="button">
            Log In with Facebook
          </button>
          <button
            className="auth submit google"
            type="button"
            onClick={async (event) => {
              const user = await this.handleGoogleSignUp();
              console.log(user);
              if (this.state.signed) {
                this.setState({ signed: false });
                navigate("/");
              }
            }}
          >
            Log In with Google
          </button>
        </form>
      </div>
    );
  }
}

export default LogIn;

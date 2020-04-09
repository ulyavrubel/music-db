import React from "react";
import { firebaseAuth, provider } from "./FirebaseInit";
import { navigate } from "@reach/router";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      signupUsername: "",
      signupEmail: "",
      signupPassword: "",
      signupConfirmPassword: "",
      signed: false,
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
          this.setState({ signed: true });
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
          className="auth form signup"
          // https://reach.tech/router/api/navigate

          onSubmit={async (event) => {
            const newUser = await this.handleSubmit(event);
            navigate("/");
          }}
        >
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

          <button className="auth submit facebook" type="button">
            Sign Up with Facebook
          </button>
          <button
            className="auth submit google"
            type="button"
            onClick={async (event) => {
              const user = await this.handleGoogleSignUp();
              console.log(user);
              if (this.state.signed) {
                navigate("/");
              }
            }}
          >
            Sign Up with Google
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;

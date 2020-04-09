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
        .catch((err) => console.log(err.message));
    } else {
      this.setState({ showErr: true });
    }
  };

  handleGoogleSignUp = () => {
    firebaseAuth
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        this.setState({ signed: true });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorMessage);
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
            if (this.state.signed) {
              navigate("/");
            }
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
            onClick={this.handleGoogleSignUp}
          >
            Sign Up with Google
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;

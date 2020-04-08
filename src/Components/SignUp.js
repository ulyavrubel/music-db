import React from "react";

function SignUp() {
  return (
    <div className="auth container">
      <form className="auth form signup">
        <h3>Create new MusicDB account</h3>
        <input
          className="auth input"
          name="signup-username"
          id="signup-username"
          type="text"
          placeholder="Username"
          required
        ></input>
        <input
          className="auth input"
          name="signup-email"
          id="signup-email"
          type="email"
          placeholder="E-mail"
          required
        ></input>
        <input
          className="auth input"
          name="signup-password"
          id="signup-password"
          type="password"
          placeholder="Password"
          required
        ></input>
        <input
          className="auth input"
          name="signup-confirm-password"
          id="signup-confirm-password"
          type="password"
          placeholder="Confirm password"
          required
        ></input>
        <button className="auth submit" type="submit">
          Create account
        </button>
        <p>
          Already have an account? <a href="/login">Log In</a>
        </p>

        <button className="auth submit facebook" type="button">
          Sign Up with Facebook
        </button>
        <button className="auth submit google" type="button">
          Sign Up with Google
        </button>
      </form>
    </div>
  );
}

export default SignUp;

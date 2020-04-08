import React from "react";

function LogIn() {
  return (
    <div className="auth container">
      <form className="auth form">
        <h3>Log In to Music-DB</h3>
        <input
          className="auth input"
          name="login-email"
          id="login-email"
          type="email"
          placeholder="E-mail"
          required
        ></input>
        <input
          className="auth input"
          name="login-password"
          id="login-password"
          type="password"
          placeholder="Password"
          required
        ></input>
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
        <button className="auth submit google" type="button">
          Log In with Google
        </button>
      </form>
    </div>
  );
}

export default LogIn;

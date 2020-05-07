import React, { useState } from "react";
import { firebaseAuth } from "./FirebaseInit";
import { navigate } from "@reach/router";

function ForgotPassword() {
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setResetPasswordEmail(event.target.value);
  };

  const handleSubmit = () => {
    firebaseAuth
      .auth()
      .sendPasswordResetEmail(resetPasswordEmail)
      .then((result) => {
        console.log(result);
        alert(`Email has been sent to ${resetPasswordEmail}`);
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h3 className="auth-form__header">Forgot your password?</h3>
        <p className="auth-form__forgot">
          Enter your account e-mail <br />
          and we will send you the instructions
        </p>
        <input
          className="auth-form__input"
          name="resetPasswordEmail"
          id="resetPasswordEmail"
          type="email"
          placeholder="E-mail"
          required
          onChange={handleChange}
        ></input>

        <button className="btn btn-black btn-black--reset" type="submit">
          Reset Password
        </button>
        <p className="auth-form__paragraph">
          Don’t have an account?{" "}
          <a className="auth-form__link" href="/signup">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;

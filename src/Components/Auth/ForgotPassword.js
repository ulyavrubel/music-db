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
      .then(alert(`Email has been sent to ${resetPasswordEmail}`))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="auth container">
      <form
        className="auth form"
        onSubmit={async () => {
          const user = await handleSubmit();
          console.log(user);
          navigate("/");
        }}
      >
        <h3>Forgot your password?</h3>
        <p className="forgot">
          Enter your account e-mail <br />
          and we will send you the instructions
        </p>
        <input
          className="auth input"
          name="resetPasswordEmail"
          id="resetPasswordEmail"
          type="email"
          placeholder="E-mail"
          required
          onChange={handleChange}
        ></input>

        <button className="auth submit reset" type="submit">
          Reset Password
        </button>
        <p>
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;

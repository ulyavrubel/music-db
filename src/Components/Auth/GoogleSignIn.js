import React from "react";
import { firebaseAuth, provider } from "./FirebaseInit";
import { navigate } from "@reach/router";

function GoogleSignIn(props) {
  const handleGoogleSignUp = () => {
    firebaseAuth
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch(function (err) {
        props.sendErr(err.message);
        console.log(err.message);
      });
  };

  return (
    <button
      className="auth submit google"
      type="button"
      onClick={handleGoogleSignUp}
    >
      Sign Up with Google
    </button>
  );
}

export default GoogleSignIn;

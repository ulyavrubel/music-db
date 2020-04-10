import React from "react";
import { firebaseAuth, providerFB } from "./FirebaseInit";
import { navigate } from "@reach/router";

function FacebookSignIn(props) {
  const handleFacebookSignIn = () => {
    firebaseAuth
      .auth()
      .signInWithPopup(providerFB)
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((err) => {
        props.sendErr(err.message);
        console.log(err.message);
      });
  };
  return (
    <button
      className="auth submit facebook"
      type="button"
      onClick={handleFacebookSignIn}
    >
      Sign Up with Facebook
    </button>
  );
}

export default FacebookSignIn;

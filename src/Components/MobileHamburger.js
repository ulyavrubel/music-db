import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "./Auth/AuthProvider";
import { Link } from "@reach/router";
import { firebaseAuth } from "./Auth/FirebaseInit";
import useOutsideClick from "./Helpers/useOutsideClick";
import hamburger from "../img/hamburger.svg";

function MobileHamburger(props) {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const logout = () => {
    firebaseAuth.auth().signOut();
    console.log(currentUser + "signed out");
  };
  const ref = useRef();
  useOutsideClick(ref, () => {
    setOpen(false);
  });
  return (
    <div className="hamburger container mobile" ref={ref}>
      <img
        className="hamburger mobile"
        src={hamburger}
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        style={open ? { transform: "rotate(90deg)" } : { transform: "none" }}
        alt="..."
      ></img>
      {!currentUser ? (
        <div
          className="hamburger links"
          style={open ? { display: "block" } : { display: "none" }}
          onClick={() => setOpen(false)}
        >
          <a href="/login">Log In</a>
          <a href="/signup">Sign Up</a>
        </div>
      ) : (
        <div
          className="hamburger links"
          style={open ? { display: "block" } : { display: "none" }}
          onClick={() => setOpen(false)}
        >
          <Link to={`/profile/${currentUser.displayName}`}>
            Profile: <span>{currentUser.displayName}</span>
          </Link>
          <Link to={`/collection/${currentUser.displayName}`}>Collection</Link>
          <Link to={`/wishlist/${currentUser.displayName}`}>Wishlist</Link>
          <Link to="/upload">Upload</Link>
          <a className="logout" href="/" onClick={logout}>
            Log Out
          </a>
        </div>
      )}
    </div>
  );
}

export default MobileHamburger;

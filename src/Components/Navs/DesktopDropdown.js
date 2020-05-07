import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Link } from "@reach/router";
import { firebaseAuth } from "../Auth/FirebaseInit";
import useOutsideClick from "../Helpers/useOutsideClick";
import dropdown from "../../img/dropdown.svg";

function DesktopDropdown(props) {
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
    <div className="desktop">
      {!currentUser ? (
        <div className="auth-links">
          <a className="auth-links__link" href="/login">
            Log In
          </a>
          <a className="auth-links__link" href="/signup">
            Sign Up
          </a>
        </div>
      ) : (
        <div className="auth-links">
          <a className="auth-links__link logout" href="/" onClick={logout}>
            Log Out
          </a>
          <div
            className="hamburger-container"
            ref={ref}
            onClick={() => (open ? setOpen(false) : setOpen(true))}
          >
            <p className="navbar-account">Account</p>
            <img
              className="hamburger-container__img"
              src={dropdown}
              style={
                open ? { transform: "none" } : { transform: "rotate(180deg)" }
              }
              alt="..."
            ></img>
            <div
              className="hamburger-links"
              style={open ? { display: "block" } : { display: "none" }}
              onClick={() => setOpen(false)}
            >
              <Link
                className="dropdown-links__link"
                to={`/profile/${currentUser.displayName}`}
              >
                Profile: <span>{currentUser.displayName}</span>
              </Link>
              <Link
                className="dropdown-links__link"
                to={`/collection/${currentUser.displayName}`}
              >
                Collection
              </Link>
              <Link
                className="dropdown-links__link"
                to={`/wishlist/${currentUser.displayName}`}
              >
                Wishlist
              </Link>
              <Link className="dropdown-links__link" to="/upload">
                Upload
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesktopDropdown;

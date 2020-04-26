import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "./Auth/AuthProvider";
import { Link } from "@reach/router";
import { firebaseAuth } from "./Auth/FirebaseInit";
import useOutsideClick from "./Helpers/useOutsideClick";
import dropdown from "../img/dropdown.svg";

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
    <div>
      {!currentUser ? (
        <div className="navbar auth links">
          <a href="/login">Log In</a>
          <a href="/signup">Sign Up</a>
        </div>
      ) : (
        <div className="navbar auth links">
          <a className="logout" href="#" onClick={logout}>
            Log Out
          </a>
          <div
            className="hamburger container"
            ref={ref}
            onClick={() => (open ? setOpen(false) : setOpen(true))}
          >
            <a>Account</a>
            <img
              className="hamburger"
              src={dropdown}
              style={
                open ? { transform: "none" } : { transform: "rotate(180deg)" }
              }
              alt="..."
            ></img>
            <div
              className="hamburger links"
              style={open ? { display: "block" } : { display: "none" }}
              onClick={() => setOpen(false)}
              id="nav-dropdown"
            >
              <Link
                className="desktop dropdown item link"
                to={`/profile/${currentUser.displayName}`}
              >
                Profile: <span>{currentUser.displayName}</span>
              </Link>
              <Link
                className="desktop dropdown item link"
                to={`/collection/${currentUser.displayName}`}
              >
                Collection
              </Link>
              <Link
                className="desktop dropdown item link"
                to={`/wishlist/${currentUser.displayName}`}
              >
                Wishlist
              </Link>
              <Link className="desktop dropdown item link" to="/upload">
                Upload
              </Link>
              <a className="desktop dropdown item link" href="#">
                Explore genres
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesktopDropdown;

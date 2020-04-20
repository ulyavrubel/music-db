import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "./Auth/AuthProvider";
import { firebaseAuth } from "./Auth/FirebaseInit";
import { Link, navigate } from "@reach/router";
import logo from "../img/logo.png";
import icon from "../img/search-icon.svg";
import hamburger from "../img/hamburger.svg";
import useOutsideClick from "./Helpers/useOutsideClick";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const logout = () => {
    firebaseAuth.auth().signOut();
    console.log(currentUser + "signed out");
  };

  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  const ref = useRef();
  useOutsideClick(ref, () => {
    setOpen(false);
  });

  return (
    <div className="navbar">
      <a href="/">
        <img className="logo" src={logo} alt="musicdb logo"></img>
      </a>

      <form>
        <input
          className="input search"
          name="search"
          id="search"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        ></input>
        <div
          className="button search"
          onClick={() => navigate(`/search/${query}/all`)}
        >
          <img className="img search" src={icon} alt="..."></img>
        </div>
      </form>
      <div className="hamburger container" ref={ref}>
        <img
          className="hamburger"
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
            <a href="#">Explore genres</a>
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
            <Link to={`/collection/${currentUser.displayName}`}>
              Collection
            </Link>

            <a href="#">Wishlist</a>

            <Link to="/upload">Upload</Link>
            <a href="#">Explore genres</a>
            <a className="logout" href="#" onClick={logout}>
              Log Out
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

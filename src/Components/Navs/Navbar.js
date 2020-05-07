import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { navigate } from "@reach/router";
import logo from "../../img/logo.png";
import logoD from "../../img/logo-MusicDB.png";
import icon from "../../img/search-icon.svg";
import MobileHamburger from "./MobileHamburger";
import DesktopDropdown from "./DesktopDropdown";
import { Link } from "@reach/router";
import { firebaseAuth } from "../Auth/FirebaseInit";
import useOutsideClick from "../Helpers/useOutsideClick";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const logout = () => {
    firebaseAuth.auth().signOut();
    console.log(currentUser + "signed out");
  };
  const ref = useRef();
  useOutsideClick(ref, () => {
    setOpen(false);
  });

  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value.replace(/%/g, ""));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search/${query}/all`);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    setOpen(!open);
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo-form">
          <a href="/">
            <img
              className="navbar__logo mobile"
              src={logo}
              alt="musicdb logo"
            ></img>
            <img
              className="navbar__logo desktop"
              src={logoD}
              alt="musicdb logo"
            ></img>
          </a>
          <form className="navbar__form">
            <input
              className="navbar__input"
              name="search"
              id="search"
              placeholder="Search"
              value={query}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            ></input>
            <div
              className="navbar__button"
              onClick={() => navigate(`/search/${query}/all`)}
            >
              <img className="navbar__button-img" src={icon} alt="..."></img>
            </div>
          </form>
        </div>

        <MobileHamburger
          className="mobile"
          handleClick={handleClick}
          open={open}
        />
        <DesktopDropdown className="desktop" />
      </div>
      <div
        className="hamburger-menu mobile"
        style={open ? { left: "0px" } : { left: "-100vw" }}
      >
        {!currentUser ? (
          <div
            className="hamburger-links"
            style={open ? { display: "block" } : { display: "none" }}
            onClick={() => setOpen(false)}
          >
            <a className="hamburger-links__link" href="/login">
              Log In
            </a>
            <a className="hamburger-links__link" href="/signup">
              Sign Up
            </a>
          </div>
        ) : (
          <div
            className="hamburger-links mobile"
            style={open ? { display: "block" } : { display: "none" }}
            onClick={() => setOpen(false)}
          >
            <Link
              className="hamburger-links__link"
              to={`/profile/${currentUser.displayName}`}
            >
              Profile: <span>{currentUser.displayName}</span>
            </Link>
            <Link
              className="hamburger-links__link"
              to={`/collection/${currentUser.displayName}`}
            >
              Collection
            </Link>
            <Link
              className="hamburger-links__link"
              to={`/wishlist/${currentUser.displayName}`}
            >
              Wishlist
            </Link>
            <Link className="hamburger-links__link" to="/upload">
              Upload
            </Link>
            <a
              className="hamburger-links__link logout"
              href="/"
              onClick={logout}
            >
              Log Out
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

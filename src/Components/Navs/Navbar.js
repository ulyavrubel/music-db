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
            <img className="logo mobile" src={logo} alt="musicdb logo"></img>
            <img className="logo desktop" src={logoD} alt="musicdb logo"></img>
          </a>
          <form className="form search">
            <input
              className="input search"
              name="search"
              id="search"
              placeholder="Search"
              value={query}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            ></input>
            <div
              className="button search"
              onClick={() => navigate(`/search/${query}/all`)}
            >
              <img className="img search" src={icon} alt="..."></img>
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
        className="burger-menu mobile"
        style={open ? { left: "0px" } : { left: "-100vw" }}
      >
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
            className="hamburger links mobile"
            style={open ? { display: "block" } : { display: "none" }}
            onClick={() => setOpen(false)}
          >
            <Link to={`/profile/${currentUser.displayName}`}>
              Profile: <span>{currentUser.displayName}</span>
            </Link>
            <Link to={`/collection/${currentUser.displayName}`}>
              Collection
            </Link>
            <Link to={`/wishlist/${currentUser.displayName}`}>Wishlist</Link>
            <Link to="/upload">Upload</Link>
            <a className="logout" href="/" onClick={logout}>
              Log Out
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

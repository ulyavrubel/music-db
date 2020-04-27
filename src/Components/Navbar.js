import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "./Auth/AuthProvider";
import { firebaseAuth } from "./Auth/FirebaseInit";
import { Link, navigate } from "@reach/router";
import logo from "../img/logo.png";
import logoD from "../img/logo-MusicDB.png";
import icon from "../img/search-icon.svg";
import hamburger from "../img/hamburger.svg";
import useOutsideClick from "./Helpers/useOutsideClick";
import MobileHamburger from "./MobileHamburger";
import DesktopDropdown from "./DesktopDropdown";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search/${query}/all`);
    }
  };

  const ref = useRef();
  useOutsideClick(ref, () => {
    setOpen(false);
  });

  return (
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

      <MobileHamburger className="mobile" />
      <DesktopDropdown className="desktop" />
    </div>
  );
}

export default Navbar;

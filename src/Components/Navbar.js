import React, { useState } from "react";
import logo from "../img/logo.png";
import icon from "../img/search-icon.svg";
import hamburger from "../img/hamburger.svg";

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="musicdb logo"></img>
      <form>
        <input
          className="input search"
          name="search"
          id="search"
          placeholder="Search"
        ></input>
        <div className="button search">
          <img className="img search" src={icon}></img>
        </div>
      </form>
      <img
        className="hamburger"
        src={hamburger}
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        style={open ? { transform: "rotate(90deg)" } : { transform: "none" }}
      ></img>
      <div
        className="hamburger links"
        style={open ? { display: "block" } : { display: "none" }}
      >
        <a href="#">Log In</a>
        <a href="#">Sign Up</a>
        <a href="#">Explore genres</a>
      </div>
    </div>
  );
}

export default Navbar;

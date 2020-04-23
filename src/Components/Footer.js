import React, { useState } from "react";
import logo from "../img/logo.png";
import menu from "../img/footer-icon.svg";

function Footer() {
  const [open, setOpen] = useState(false);
  return (
    <footer>
      <div className="footer container">
        <div className="icons container">
          <a href="/">
            <img className="footer logo" src={logo} alt="..."></img>
          </a>

          <img
            className="hamburger"
            src={menu}
            alt="..."
            onClick={() => (open ? setOpen(false) : setOpen(true))}
            style={
              open ? { transform: "rotate(180deg)" } : { transform: "none" }
            }
          ></img>
          <div
            className="hamburger links"
            style={open ? { display: "block" } : { display: "none" }}
          >
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Copyright</a>
            <a href="#">Help</a>
          </div>
        </div>

        <p className="footer p">
          Created by <a href="https://github.com/ulyavrubel">Ulyana Sichkar</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

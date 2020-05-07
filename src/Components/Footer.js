import React, { useState } from "react";
import logo from "../img/logo.png";
import menu from "../img/footer-icon.svg";

function Footer() {
  const [open, setOpen] = useState(false);
  return (
    <footer>
      <div className="footer-container">
        <div className="icons-container">
          <a href="/">
            <img className="footer-logo" src={logo} alt="..."></img>
          </a>

          <img
            className="hamburger mobile"
            src={menu}
            alt="..."
            onClick={() => (open ? setOpen(false) : setOpen(true))}
            style={
              open ? { transform: "rotate(180deg)" } : { transform: "none" }
            }
          ></img>
          <div
            className="footer__hamburger-links hamburger-links mobile"
            style={open ? { display: "block" } : { display: "none" }}
          >
            <a className="hamburger-links__link" href="/">
              Terms of Use
            </a>
            <a className="hamburger-links__link" href="/">
              Privacy Policy
            </a>
            <a className="hamburger-links__link" href="/">
              Copyright
            </a>
            <a className="hamburger-links__link" href="/">
              Help
            </a>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-links-desktop desktop">
            <a className="footer-links-desktop__link" href="/">
              Terms of Use
            </a>
            <a className="footer-links-desktop__link" href="/">
              Privacy Policy
            </a>
            <a className="footer-links-desktop__link" href="/">
              Copyright
            </a>
            <a className="footer-links-desktop__link" href="/">
              Help
            </a>
          </div>
          <p>
            Created by{" "}
            <a
              className="footer-createdby"
              href="https://github.com/ulyavrubel"
            >
              Ulyana Sichkar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

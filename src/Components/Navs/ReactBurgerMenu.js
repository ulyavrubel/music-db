import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Link } from "@reach/router";
import { firebaseAuth } from "../Auth/FirebaseInit";
import useOutsideClick from "../Helpers/useOutsideClick";
import { slide as Menu } from "react-burger-menu";
import "./burger.css";

function ReactBurgerMenu() {
  //   const { currentUser } = useContext(AuthContext);
  //   const [open, setOpen] = useState(false);

  //   const logout = () => {
  //     firebaseAuth.auth().signOut();
  //     console.log(currentUser + "signed out");
  //   };
  //   const ref = useRef();
  //   useOutsideClick(ref, () => {
  //     setOpen(false);
  //   });

  // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
  return (
    <Menu>
      <a id="home" className="menu-item" href="/">
        Home
      </a>
      <a id="about" className="menu-item" href="/about">
        About
      </a>
      <a id="contact" className="menu-item" href="/contact">
        Contact
      </a>
      <a className="menu-item--small" href="">
        Settings
      </a>
    </Menu>
  );
}

export default ReactBurgerMenu;

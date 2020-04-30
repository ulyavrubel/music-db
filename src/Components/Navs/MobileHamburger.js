import React from "react";
import hamburger from "../../img/hamburger.svg";

function MobileHamburger(props) {
  return (
    <div className="hamburger container mobile">
      <img
        className="hamburger mobile"
        src={hamburger}
        onClick={props.handleClick}
        style={
          props.open ? { transform: "rotate(90deg)" } : { transform: "none" }
        }
        alt="..."
      ></img>
    </div>
  );
}

export default MobileHamburger;

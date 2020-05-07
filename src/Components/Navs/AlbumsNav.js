import React from "react";
import Sort from "../Sort";
import viewGrid from "../../img/view-grid.svg";
import viewRows from "../../img/view-rows.svg";

function AlbumsNav(props) {
  return (
    <div className="navbar-albums">
      <Sort onChange={props.handleChange} />

      <div className="view">
        <div className="view__square" onClick={props.handleGrid}>
          <img className="view__img" src={viewGrid} alt="..."></img>
        </div>
        <div className="view__square" onClick={props.handleRows} id="rows">
          <img className="view__img" src={viewRows} alt="..."></img>
        </div>
      </div>
    </div>
  );
}

export default AlbumsNav;

import React from "react";
import Sort from "../Sort";
import viewGrid from "../../img/view-grid.svg";
import viewRows from "../../img/view-rows.svg";

function AlbumsNav(props) {
  return (
    <div className="collection nav">
      <Sort onChange={props.handleChange} />

      <div className="view container">
        <div className="view square" onClick={props.handleGrid}>
          <img src={viewGrid} alt="..."></img>
        </div>
        <div className="view square" onClick={props.handleRows} id="rows">
          <img src={viewRows} alt="..."></img>
        </div>
      </div>
    </div>
  );
}

export default AlbumsNav;

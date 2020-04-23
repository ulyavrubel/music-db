import React from "react";
import viewGrid from "../img/view-grid.svg";
import viewRows from "../img/view-rows.svg";

function AlbumsNav(props) {
  return (
    <div className="collection nav">
      <div>
        <label>Sort by</label>
        <select
          className="collection select"
          id="sort"
          onChange={props.handleChange}
        >
          <option value="newest" className="collection nav option">
            Newest
          </option>
          <option value="artist" className="collection nav option">
            Artist
          </option>
          <option value="album" className="collection nav option">
            Album
          </option>
          <option value="genre" className="collection nav option">
            Genre
          </option>
          <option value="released" className="collection nav option">
            Year
          </option>
        </select>
      </div>

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

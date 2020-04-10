import React, { useState, useContext } from "react";
import { AuthContext } from "./Auth/AuthProvider";
import ProfileNav from "./ProfileNav";
import viewGrid from "../img/view-grid.svg";
import viewRows from "../img/view-rows.svg";

function Collection() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <h3>Please, login to see collection</h3>;
  }

  return (
    <div>
      <ProfileNav />
      <div className="collection nav">
        <div>
          <label>Sort by</label>
          <select className="collection select" id="sort">
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
            <option value="year" className="collection nav option">
              Year
            </option>
          </select>
        </div>

        <div className="view container">
          <div className="view square">
            <img src={viewGrid} alt="..."></img>
          </div>
          <div className="view square">
            <img src={viewRows} alt="..."></img>
          </div>
        </div>
      </div>
      <div>Grid</div>
    </div>
  );
}

export default Collection;

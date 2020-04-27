import React from "react";

function Sort(props) {
  return (
    <div>
      <label>Sort by</label>
      <select className="collection select" id="sort" onChange={props.onChange}>
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
  );
}

export default Sort;

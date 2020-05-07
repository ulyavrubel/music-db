import React from "react";

function Sort(props) {
  return (
    <div className="sort">
      <label className="sort__label">Sort by</label>
      <select className="sort__select" id="sort" onChange={props.onChange}>
        <option value="newest" className="sort__select__option">
          Newest
        </option>
        <option value="artist" className="sort__select__option">
          Artist
        </option>
        <option value="album" className="sort__select__option">
          Album
        </option>
        <option value="genre" className="sort__select__option">
          Genre
        </option>
        <option value="released" className="sort__select__option">
          Year
        </option>
      </select>
    </div>
  );
}

export default Sort;

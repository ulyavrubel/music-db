import React from "react";

function Sort(props) {
  return (
    <div className="sort">
      <label className="sort__label">Sort by</label>
      <select className="sort__select" id="sort" onChange={props.onChange}>
        <option value="newest" className="sort__select__option marg-b-xxs">
          Newest
        </option>
        <option value="artist" className="sort__select__option marg-b-xxs">
          Artist
        </option>
        <option value="album" className="sort__select__option marg-b-xxs">
          Album
        </option>
        <option value="genre" className="sort__select__option marg-b-xxs">
          Genre
        </option>
        <option value="released" className="sort__select__option marg-b-xxs">
          Year
        </option>
      </select>
    </div>
  );
}

export default Sort;

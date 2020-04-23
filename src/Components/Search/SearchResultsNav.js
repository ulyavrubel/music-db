import React from "react";
import { Link } from "@reach/router";
import { NavLink } from "../ProfileNav";

function SearchResultsNav() {
  return (
    <div className="profile nav">
      <NavLink className="profile nav link" to="all">
        All
      </NavLink>
      <NavLink className="profile nav link" to="release">
        Release
      </NavLink>
      <NavLink className="profile nav link" to="artist">
        Artist
      </NavLink>
      <NavLink className="profile nav link" to="label">
        Label
      </NavLink>
    </div>
  );
}
export default SearchResultsNav;
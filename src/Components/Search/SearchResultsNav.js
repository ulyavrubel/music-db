import React from "react";
import { NavLink } from "../Navs/ProfileNav";

function SearchResultsNav() {
  return (
    <div className="navbar-profile">
      <NavLink className="navbar-profile__link" to="all">
        All
      </NavLink>
      <NavLink className="navbar-profile__link" to="release">
        Release
      </NavLink>
      <NavLink className="navbar-profile__link" to="artist">
        Artist
      </NavLink>
      <NavLink className="navbar-profile__link" to="label">
        Label
      </NavLink>
    </div>
  );
}
export default SearchResultsNav;

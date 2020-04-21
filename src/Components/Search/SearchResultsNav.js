import React from "react";
import { Link } from "@reach/router";

function SearchResultsNav() {
  return (
    <div className="profile nav">
      <Link className="profile nav link" to="all">
        All
      </Link>
      <Link className="profile nav link" to="release">
        Release
      </Link>
      <Link className="profile nav link" to="artist">
        Artist
      </Link>
      <Link className="profile nav link" to="label">
        Label
      </Link>
    </div>
  );
}
export default SearchResultsNav;

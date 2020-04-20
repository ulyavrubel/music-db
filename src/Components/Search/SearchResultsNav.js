import React from "react";

function SearchResultsNav(props) {
  return (
    <div className="profile nav">
      <a className="profile nav link" href={`search/${props.q}/all`}>
        All
      </a>
      <a className="profile nav link" href={`search/${props.q}/release`}>
        Release
      </a>
      <a className="profile nav link" href={`search/${props.q}/artist`}>
        Artist
      </a>
      <a className="profile nav link" href={`search/${props.q}/label`}>
        Label
      </a>
    </div>
  );
}
export default SearchResultsNav;

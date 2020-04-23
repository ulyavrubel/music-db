import React, { useState } from "react";
import { Link, navigate } from "@reach/router";

function NothingFound() {
  const [query, setQuery] = useState("");
  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };
  return (
    <div className="nothingFound">
      <p>
        Sorry, but nothing matched <br />
        your search terms.
      </p>
      <p className="nothingFound please">Please, try again.</p>
      <form
        className="subscribe form nothingFound"
        onSubmit={() => navigate(`/search/${query}/all`)}
      >
        <input
          className="nothingFound input search"
          name="search"
          id="search"
          placeholder="Artist, Album, Label"
          type="text"
          onChange={handleChange}
        ></input>
        <button className="nothingFound button search" type="submit">
          Search
        </button>
      </form>
      <p className="nothingFound link">
        Or <Link to="/upload">add new album</Link> to the database.
      </p>
    </div>
  );
}

export default NothingFound;

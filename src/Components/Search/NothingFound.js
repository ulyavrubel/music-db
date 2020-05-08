import React, { useState } from "react";
import { Link, navigate } from "@reach/router";

function NothingFound() {
  const [query, setQuery] = useState("");
  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };
  return (
    <div className="nothingFound marg-t-xl ">
      <p>
        Sorry, but nothing matched <br className="mobile" />
        your search terms.
      </p>
      <p className="nothingFound__paragraph marg-t-xxs">Please, try again.</p>
      <form
        className="nothingFound__form marg-t-s marg-b-l"
        onSubmit={() => navigate(`/search/${query}/all`)}
      >
        <input
          className="nothingFound__input marg-t-zero"
          name="search"
          id="search"
          placeholder="Artist, Album, Label"
          type="text"
          onChange={handleChange}
        ></input>
        <button className="btn btn-black btn-black-search" type="submit">
          Search
        </button>
      </form>
      <p className="marg-b-xxl">
        Or{" "}
        <Link className="nothingFound__paragraph--link" to="/upload">
          add new album
        </Link>{" "}
        to the database.
      </p>
    </div>
  );
}

export default NothingFound;

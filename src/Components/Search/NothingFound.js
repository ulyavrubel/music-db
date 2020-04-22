import React from "react";
import { Link, navigate } from "@reach/router";

function NothingFound(props) {
  return (
    <div className="container">
      <p>
        Sorry, but nothing matched your search terms
        <br />
        Please, try again.
      </p>
      <form className="subscribe form">
        <input
          className="subscribe input"
          name="subscribe"
          id="subscribe"
          placeholder="Artist, Album, Label"
          type="email"
        ></input>
        <button className="subscribe button" type="submit">
          Search
        </button>
      </form>
      <p>
        Or <Link to="/upload">add new album</Link> to the database.
      </p>
    </div>
  );
}

export default NothingFound;

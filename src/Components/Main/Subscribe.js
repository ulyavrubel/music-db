import React from "react";

function Subscribe() {
  return (
    <div className="subscribe container">
      {/* <h2 className="subscribe container header mobile">
        Join our newsletter, <span>keep up with new updates! </span>
      </h2> */}
      <h2 className="subscribe container header desktop">
        Explore new music with us.{" "}
        <span>
          Track your collection and wantlist. Contribute to the catalog.{" "}
        </span>
      </h2>
      {/* <form className="subscribe form">
        <input
          className="subscribe input"
          name="subscribe"
          id="subscribe"
          placeholder="Enter your e-mail"
          type="email"
        ></input>
        <button className="subscribe button" type="submit">
          Subscribe
        </button>
      </form> */}
    </div>
  );
}

export default Subscribe;

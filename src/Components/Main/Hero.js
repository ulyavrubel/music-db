import React from "react";
import Slideshow from "./Slideshow";

function Hero() {
  return (
    <div className="hero container">
      <div className="mobile">
        <h1>Explore new music with us</h1>
        <br />
        <h5>
          Track your collection and wantlist <br />
          Contribute to the catalog
        </h5>
      </div>

      <Slideshow />
    </div>
  );
}
export default Hero;

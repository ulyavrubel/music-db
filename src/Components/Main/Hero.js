import React from "react";
import Slideshow from "./Slideshow";

function Hero() {
  return (
    <div className="hero-container marg-t-xxl marg-b-l">
      <div className="mobile">
        <h1 className="hero-container__header ">Explore new music with us</h1>
        <br />
        <h5 className="hero-container__header hero-container__header--h5 marg-b-l">
          Track your collection and wantlist <br />
          Contribute to the catalog
        </h5>
      </div>

      <Slideshow />
    </div>
  );
}
export default Hero;

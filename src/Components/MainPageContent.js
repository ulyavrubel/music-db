import React from "react";
import Hero from "./Hero";
import Subscribe from "./Subscribe";

function MainPageContent() {
  return (
    <div>
      <Hero />
      <Subscribe />
      <div className="recentlyAdded container">Recently added albums</div>
    </div>
  );
}

export default MainPageContent;

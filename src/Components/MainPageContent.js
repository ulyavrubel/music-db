import React from "react";
import Subscribe from "./Subscribe";

function MainPageContent() {
  return (
    <div>
      <Subscribe />
      <div className="recentlyAdded container">Recently added albums</div>
    </div>
  );
}

export default MainPageContent;

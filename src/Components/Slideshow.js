import React, { useState } from "react";
import hero1 from "../img/hero1.jpg";
import hero2 from "../img/hero2.jpg";
import hero3 from "../img/hero3.jpg";
import left from "../img/left.svg";
import right from "../img/right.svg";

const images = [
  {
    img: hero2,
    title: "Narita Remixed",
    artist: "Svreca",
    href: "",
    order: 1,
    textColor: "rgba(255, 255, 255, 1)",
  },
  {
    img: hero1,
    title: "The Aquaplano Sessions",
    artist: "Donato Dozzy & Nuel",
    href: "",
    order: 0,
    textColor: "rgba(0, 0, 0, 1)",
  },
  {
    img: hero3,
    title: "2845",
    artist: "Convextion",
    href: "",
    order: 2,
    textColor: "rgba(255, 255, 255, 1)",
  },
];

const orders = [
  [images[0], images[1], images[2]],
  [images[1], images[2], images[0]],
  [images[2], images[0], images[1]],
];

function SlideShow() {
  const [index, setIndex] = useState(0);

  function handleNext() {
    if (index === 0) {
      setIndex(2);
    } else {
      setIndex(index - 1);
    }
  }

  function handlePrev() {
    if (index === 2) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  function makeSlides(arr) {
    return arr.map((image) => {
      return (
        <div key={image.title} className="slideshow img container">
          <img
            className="hero"
            src={image.img}
            alt={image.title}
            width="100px"
          ></img>
          <div></div>
          <div className="img text" style={{ color: image.textColor }}>
            {image.title} <br />
            {image.artist}
          </div>
        </div>
      );
    });
  }
  return (
    <div className="slideshow box">
      <img
        className="navigation"
        src={left}
        onClick={handlePrev}
        alt=".."
      ></img>
      {makeSlides(orders[index])}
      <img
        className="navigation"
        src={right}
        onClick={handleNext}
        alt=".."
      ></img>
    </div>
  );
}

export default SlideShow;

import React, { useState } from "react";
import hero1 from "../../img/hero1.jpg";
import hero2 from "../../img/hero2.jpg";
import hero3 from "../../img/hero3.jpg";
import left from "../../img/left.svg";
import right from "../../img/right.svg";

const images = [
  {
    img: hero2,
    title: "Narita Remixed",
    artist: "Svreca",
    href: "/albums/BhJOHfcUcZxjAusf1hOq",
    order: 1,
    textColor: "rgba(255, 255, 255, 1)",
  },
  {
    img: hero1,
    title: "The Aquaplano Sessions",
    artist: "Donato Dozzy & Nuel",
    href: "/albums/HK9MBfCh1JdzF8Gdaqnh",
    order: 0,
    textColor: "rgba(0, 0, 0, 1)",
  },
  {
    img: hero3,
    title: "2845",
    artist: "Convextion",
    href: "/albums/8Nb5YfVb64bkTOE4TNdI",
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
    var index = 0;
    return arr.map((image) => {
      index++;
      return (
        <div
          key={image.title}
          className={
            index === 2
              ? "slideshow__img-container slideshow__img-container--center"
              : "slideshow__img-container slideshow__img-container--side"
          }
        >
          <a href={image.href}>
            <img
              className="slideshow__hero"
              src={image.img}
              alt={image.title}
            ></img>
            <div
              className="slideshow__img-text"
              style={{ color: image.textColor }}
            >
              {image.title} <br />
              {image.artist}
            </div>
          </a>
        </div>
      );
    });
  }
  return (
    <div className="slideshow marg-b-l">
      <img
        className="slideshow__navigation"
        src={left}
        onClick={handlePrev}
        alt=".."
      ></img>
      {makeSlides(orders[index])}
      <img
        className="slideshow__navigation"
        src={right}
        onClick={handleNext}
        alt=".."
      ></img>
    </div>
  );
}

export default SlideShow;

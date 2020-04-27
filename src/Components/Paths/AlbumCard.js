import React from "react";
import { Link } from "@reach/router";

function AlbumCard(props) {
  let {
    url,
    artist,
    title,
    label,
    format,
    country,
    released,
    genre,
  } = props.album;

  return (
    <div className="preview box">
      <img className="preview img" src={url} alt=".."></img>
      <div className="preview info">
        <h5>
          <Link to={`/search/${artist}/artist`}>{artist}</Link> - {title}
        </h5>
        <p>
          <span>Label </span>
          <Link to={`/search/${label}/label`}>{label}</Link>
        </p>
        <p>
          <span>Format </span>
          {format}
        </p>
        <p>
          <span>Country </span>
          {country}
        </p>
        <p>
          <span>Year </span>
          {released}
        </p>
        <p>
          <span>Genre </span>
          {genre}
        </p>
      </div>
    </div>
  );
}

export default AlbumCard;

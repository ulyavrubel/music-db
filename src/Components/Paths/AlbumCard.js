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
    <div className="album-card marg-t-s">
      <img className="album-card__img" src={url} alt=".."></img>
      <div className="album-card__info">
        <h5 className="album-card__info__header marg-t-zero marg-b-xxs">
          <Link to={`/search/${artist}/artist`}>{artist}</Link> - {title}
        </h5>
        <p className="album-card__info__paragraph marg-t-zero marg-b-xxs">
          <span className="album-card__info__span">Label </span>
          <Link to={`/search/${label}/label`}>{label}</Link>
        </p>
        <p className="album-card__info__paragraph">
          <span className="album-card__info__span">Format </span>
          {format}
        </p>
        <p className="album-card__info__paragraph">
          <span className="album-card__info__span">Country </span>
          {country}
        </p>
        <p className="album-card__info__paragraph">
          <span className="album-card__info__span">Year </span>
          {released}
        </p>
        <p className="album-card__info__paragraph">
          <span className="album-card__info__span">Genre </span>
          {genre}
        </p>
      </div>
    </div>
  );
}

export default AlbumCard;

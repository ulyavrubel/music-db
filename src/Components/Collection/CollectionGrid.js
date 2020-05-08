import React from "react";
import { Link } from "@reach/router";
import { compareValues } from "../Helpers/compareValues";

function CollectionGrid(props) {
  let albums = props.collection;
  let sort = props.sort;

  if (sort === "artist") {
    albums.sort(compareValues("artist"));
  } else if (sort === "album") {
    albums.sort(compareValues("title"));
  } else if (sort === "genre") {
    albums.sort(compareValues("genre"));
  } else if (sort === "released") {
    albums.sort(compareValues("released"));
  }

  const albumItems = albums.map((album) => {
    return (
      <div className="grid-album marg-b-s" key={album.id}>
        <Link className="grid-album__link" to={`/albums/${album.id}`}>
          <img
            className="grid-album__img"
            src={album.url}
            alt={`${album.artist} - ${album.title} `}
          ></img>
        </Link>
        <p className="grid-album__paragraph">
          <Link
            className="grid-album__link"
            to={`/search/${album.artist}/artist`}
          >
            {album.artist}
          </Link>
          <br />
          <Link className="grid-album__link" to={`/albums/${album.id}`}>
            {album.title}
          </Link>
        </p>
      </div>
    );
  });
  return (
    <div className="grid-wrapper marg-t-s ">
      <div className="grid-container">{albumItems}</div>
    </div>
  );
}

export default CollectionGrid;

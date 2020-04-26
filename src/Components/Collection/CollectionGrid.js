import React from "react";
import { Link } from "@reach/router";

function CollectionGrid(props) {
  let albums = props.collection;
  let sort = props.sort;
  if (sort !== "newest") {
    albums.sort((a, b) => (a.sort < b.sort ? 1 : -1));
  }
  const albumItems = albums.map((album) => {
    return (
      <div className="collection grid album" key={album.id}>
        <Link to={`/albums/${album.id}`}>
          <img src={album.url} alt={`${album.artist} - ${album.title} `}></img>
        </Link>
        <p>
          <Link to={`/search/${album.artist}/artist`}>{album.artist}</Link>
          <br />
          <Link to={`/albums/${album.id}`}>{album.title}</Link>
        </p>
      </div>
    );
  });
  return (
    <div className="collection grid wrapper">
      <div className="collection grid container">{albumItems}</div>
    </div>
  );
}

export default CollectionGrid;

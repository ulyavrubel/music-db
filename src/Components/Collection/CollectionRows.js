import React, { useState } from "react";
import { Link } from "@reach/router";

function CollectionRows(props) {
  const [checked, setChecked] = useState([]);

  const handleChange = (event) => {
    console.log(event.target.id);
  };
  const handleRemove = () => {
    console.log("remove");
  };

  let albums = props.collection;
  let sort = props.sort;
  if (sort !== "newest") {
    albums.sort((a, b) => (a.sort < b.sort ? 1 : -1));
  }
  const albumItems = albums.map((album) => {
    return (
      <div className="collection rows album" key={album.id}>
        <input
          className="rows album input"
          type="checkbox"
          id={album.inCollectionId}
          onChange={handleChange}
        ></input>
        <Link to={`/albums/${album.id}`}>
          <img src={album.url} alt={`${album.artist} - ${album.title} `}></img>
        </Link>
        <div className="rows album info">
          <Link
            className="rows album name link"
            to={`/artists/${album.artist}`}
          >
            {album.artist}
          </Link>
          -
          <Link className="rows album name link" to={`/albums/${album.id}`}>
            {album.title}
          </Link>
          <p className="rows album format">{album.format}</p>
          <p className="rows album label">{album.label}</p>
          <p className="rows album year">
            {album.released} {album.country}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="collection rows wrapper">
      <div className="collection rows container">{albumItems}</div>
      <button onClick={handleRemove} className="auth submit upload">
        Remove Selected
      </button>
    </div>
  );
}

export default CollectionRows;

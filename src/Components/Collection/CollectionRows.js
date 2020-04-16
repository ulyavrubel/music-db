import React, { useState } from "react";
import { Link } from "@reach/router";
import Modal from "../Modal";

function CollectionRows(props) {
  const [checked, setChecked] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (event) => {
    setChecked((prev) => {
      return [...prev, event.target.value];
    });
    console.log("select" + event.target.value);
  };

  const handleClick = (event) => {
    console.log("click" + event.target.id);
  };

  const handleRemove = () => {
    console.log("remove");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  let albums = props.collection;
  let sort = props.sort;
  if (sort !== "newest") {
    albums.sort((a, b) => (a.sort < b.sort ? 1 : -1));
  }
  const albumItems = albums.map((album) => {
    return (
      <div className="collection rows album" key={album.id}>
        <select value={album.inCollectionId} onChange={handleChange}>
          <input
            className="rows album input"
            type="checkbox"
            id={album.inCollectionId}
          ></input>
        </select>

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
      <button onClick={toggleModal} className="auth submit remove">
        Remove Selected
      </button>
      {showModal ? (
        <Modal>
          <div>
            <h3>Do you want to remove selected albums from your collection?</h3>
            <div>
              <button
                className="auth submit remove modal"
                onClick={handleRemove}
              >
                Yes
              </button>
              <button
                className="auth submit remove modal"
                onClick={toggleModal}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default CollectionRows;

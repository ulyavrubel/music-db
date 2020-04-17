import React, { useState, useEffect, useContext } from "react";
import { Link } from "@reach/router";
import Modal from "../Modal";
import { firebaseDB } from "../Auth/FirebaseInit";
import { AuthContext } from "../Auth/AuthProvider";
import { removeFromDB } from "../Helpers/removeFromDB";

function CollectionRows(props) {
  const { currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [albumIDs, setAlbumIDs] = useState({ id: false });

  useEffect(() => {
    if (Object.keys(albumIDs).length === 0) {
      props.collection.map((album) => {
        setAlbumIDs((prev) => {
          return { ...prev, [album.inCollectionId]: false };
        });
      });
    }
  }, []);

  const handleChange = (event) => {
    let id = event.target.id;
    let checked = event.target.checked;
    setAlbumIDs((prev) => {
      return { ...prev, [id]: checked };
    });
  };

  const handleRemove = () => {
    for (let id in albumIDs) {
      if (albumIDs[id] === true) {
        removeFromDB(currentUser.uid, "Collection", id);
      }
    }
    setShowModal(false);
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
        <input
          className="rows album input"
          type="checkbox"
          id={album.inCollectionId}
          value={album.inCollectionId}
          onChange={handleChange}
          checked={albumIDs[album.inCollectionId]}
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
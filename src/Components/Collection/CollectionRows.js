import React, { useState, useEffect, useContext } from "react";
import { Link } from "@reach/router";
import Modal from "../Modal";
import { AuthContext } from "../Auth/AuthProvider";
import { removeFromDB } from "../Helpers/removeFromDB";
import { compareValues } from "../Helpers/compareValues";

function CollectionRows(props) {
  const { currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [albumIDs, setAlbumIDs] = useState({ id: false });

  useEffect(() => {
    if (Object.keys(albumIDs).length === 0) {
      props.collection.map((album) => {
        return setAlbumIDs((prev) => {
          return { ...prev, [album.inCollectionId]: false };
        });
      });
    }
  }, [albumIDs, props]);

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
        removeFromDB(currentUser.uid, props.collectionName, id);
      }
    }
    setShowModal(false);
    setShowMessageModal(true);
    props.handleRender();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

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
      <div className="rows-album" key={album.id}>
        <input
          className="rows-album__input"
          type="checkbox"
          id={album.inCollectionId}
          value={album.inCollectionId}
          checked={albumIDs[album.inCollectionId]}
        ></input>
        <Link to={`/albums/${album.id}`}>
          <img
            className="rows-album__img"
            src={album.url}
            alt={`${album.artist} - ${album.title} `}
          ></img>
        </Link>
        <div className="info">
          <Link className="info__link" to={`/search/${album.artist}/artist`}>
            {album.artist}
          </Link>
          -
          <Link className="info__link" to={`/albums/${album.id}`}>
            {album.title}
          </Link>
          <p className="info__paragraph marg-zero ">{album.format}</p>
          <Link className="info__link" to={`/search/${album.label}/label`}>
            {album.label}
          </Link>
          <p className="info__paragraph marg-zero ">
            {album.released} {album.country}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="rows-wrapper">
      <div className="rows-container marg-zero" onChange={handleChange}>
        {albumItems}
      </div>
      <button onClick={toggleModal} className="btn btn-black btn-black--remove">
        Remove Selected
      </button>
      {showModal ? (
        <Modal>
          <div className="modal__div marg-zero">
            <h3>
              Do you want to remove selected albums from your{" "}
              {props.collectionName}?
            </h3>
            <div>
              <button
                className="btn btn-black btn-black--modal"
                onClick={handleRemove}
              >
                Yes
              </button>
              <button
                className="btn btn-black btn-black--modal"
                onClick={toggleModal}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
      {showMessageModal ? (
        <Modal>
          <div className="modal__div marg-zero">
            <h3>Albums were removed from your {props.collectionName}</h3>
            <button
              className="btn btn-black btn-black--modal"
              onClick={() => setShowMessageModal(false)}
            >
              OK
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default CollectionRows;

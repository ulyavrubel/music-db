import React, { useEffect, useState, useContext } from "react";
import { firebaseDB } from "../Auth/FirebaseInit";
import AlbumCard from "./AlbumCard";
import { AuthContext } from "../Auth/AuthProvider";
import "./album.css";
import { removeFromDB } from "../Helpers/removeFromDB";
import { addToDBCollection } from "../Helpers/addToDBCollection";
import Modal from "../Modal";

function Album(props) {
  const [album, setAlbum] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [inCollection, setInCollection] = useState(null);
  const [inCollectionID, setInCollectionID] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    const albumRef = firebaseDB.collection("Albums").doc(props.id);
    albumRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const album = doc.data();
          album.id = doc.id;
          setAlbum(album);
        } else {
          console.log("No such document!");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    if (currentUser) {
      const collectionRef = firebaseDB
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Collection");
      collectionRef
        .where("album", "==", props.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setInCollection(true);
            setInCollectionID(doc.id);
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch(() => {
          setInCollection(false);
        });
    }
  }, [album, update]);

  const handleRemoveFromCollection = () => {
    removeFromDB(currentUser.uid, "Collection", inCollectionID);
    setShowModal(false);
    setInCollection(false);
    setUpdate(!update);
  };

  const handleAddToCollection = () => {
    addToDBCollection(currentUser.uid, "Collection", props.id);
    setUpdate(!update);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setUpdate(!update);
  };

  if (!currentUser) {
    return (
      <div className="upload container preview album">
        <AlbumCard album={album} />
        <p>
          <a href="/login">Login</a> to add to your collection
        </p>
      </div>
    );
  }

  return (
    <div className="upload container preview album">
      <AlbumCard album={album} />

      {inCollection ? (
        <button className="auth submit navigation" onClick={toggleModal}>
          Remove from my Collection
        </button>
      ) : (
        <button
          className="auth submit navigation"
          onClick={handleAddToCollection}
        >
          Add to my Collection
        </button>
      )}
      <button className="auth submit navigation">Add to my Wishlist</button>
      {showModal ? (
        <Modal>
          <div>
            <h3>Do you want to remove this album from your collection?</h3>
            <div>
              <button
                className="auth submit remove modal"
                onClick={handleRemoveFromCollection}
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

export default Album;

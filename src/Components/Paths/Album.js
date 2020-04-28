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
  const [inWishlist, setInWishlist] = useState(null);
  const [inWishlistID, setInWishlistID] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalWishlist, setShowModalWishlist] = useState(false);
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
  }, [props]);

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

      const wishlistRef = firebaseDB
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Wishlist");
      wishlistRef
        .where("album", "==", props.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setInWishlist(true);
            setInWishlistID(doc.id);
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch(() => {
          setInWishlist(false);
        });
    }
  }, [album, update, currentUser, props]);

  const handleRemoveFromCollection = () => {
    removeFromDB(currentUser.uid, "Collection", inCollectionID);
    setShowModal(false);
    setInCollection(false);
  };

  const handleAddToCollection = () => {
    addToDBCollection(currentUser.uid, "Collection", props.id);
    setUpdate(!update);
  };

  const handleRemoveFromWishlist = () => {
    removeFromDB(currentUser.uid, "Wishlist", inWishlistID);
    setShowModalWishlist(false);
    setInWishlist(false);
  };

  const handleAddToWishlist = () => {
    addToDBCollection(currentUser.uid, "Wishlist", props.id);
    setUpdate(!update);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setUpdate(!update);
  };

  const toggleModalWishlist = () => {
    setShowModalWishlist(!showModalWishlist);
    setUpdate(!update);
  };

  if (!currentUser) {
    return (
      <div className="upload container preview album">
        <AlbumCard album={album} />
        <p>
          <a href="/login">Login</a> to add to your collection, wishlist
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
      {inWishlist ? (
        <button
          className="auth submit navigation"
          onClick={toggleModalWishlist}
        >
          Remove from my Wishlist
        </button>
      ) : (
        <button
          className="auth submit navigation"
          onClick={handleAddToWishlist}
        >
          Add to my Wishlist
        </button>
      )}

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
      {showModalWishlist ? (
        <Modal>
          <div>
            <h3>Do you want to remove this album from your wishlist?</h3>
            <div>
              <button
                className="auth submit remove modal"
                onClick={handleRemoveFromWishlist}
              >
                Yes
              </button>
              <button
                className="auth submit remove modal"
                onClick={toggleModalWishlist}
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

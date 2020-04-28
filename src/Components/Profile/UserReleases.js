import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { firebaseDB } from "../Auth/FirebaseInit";

function UserReleases() {
  const { currentUser } = useContext(AuthContext);
  const [collectionLength, setCollectionLength] = useState(null);
  const [wishlistLength, setWishlistLength] = useState(null);
  const [addedByLength, setAddedByLength] = useState(null);

  useEffect(() => {
    firebaseDB
      .collection("Users")
      .doc(currentUser.uid)
      .collection("Collection")
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        const collectionLength = querySnapshot.ME.docChanges.length;
        setCollectionLength(collectionLength);
      })
      .catch((err) => {
        console.log(err.message);
        setCollectionLength(0);
      });
    firebaseDB
      .collection("Users")
      .doc(currentUser.uid)
      .collection("Wishlist")
      .get()
      .then((querySnapshot) => {
        const wishlistLength = querySnapshot.ME.docChanges.length;
        setWishlistLength(wishlistLength);
      })
      .catch((err) => {
        console.log(err.message);
        setWishlistLength(0);
      });
    firebaseDB
      .collection("Albums")
      .where("addedBy", "==", currentUser.uid)
      .get()
      .then((querySnapshot) => {
        const addedByLength = querySnapshot.ME.docChanges.length;
        setAddedByLength(addedByLength);
      })
      .catch((err) => {
        console.log(err.message);
        setAddedByLength(0);
      });
  }, [currentUser]);

  return (
    <div className="user-releases">
      <p className="user-releases header">Releases</p>
      <div className="releases-statistics">
        <a href={`/collection/${currentUser.displayName}`}>In Collection</a>
        <a
          className="statistics-number"
          href={`/collection/${currentUser.displayName}`}
        >
          {collectionLength}
        </a>
        <a href={`/wishlist/${currentUser.displayName}`}>In Wishlist</a>
        <a
          className="statistics-number"
          href={`/wishlist/${currentUser.displayName}`}
        >
          {wishlistLength}
        </a>
        <a href={`/addedBy/${currentUser.displayName}`}>Uploaded</a>
        <a
          className="statistics-number"
          href={`/addedBy/${currentUser.displayName}`}
        >
          {addedByLength}
        </a>
      </div>
    </div>
  );
}

export default UserReleases;

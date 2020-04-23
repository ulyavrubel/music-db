import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { getCollectionLength } from "../Helpers/getCollectionLength";
import { firebaseDB } from "../Auth/FirebaseInit";

function UserReleases() {
  const { currentUser } = useContext(AuthContext);
  const [userId, setuserId] = useState("");
  const [collectionLength, setCollectionLength] = useState(null);
  const [wishlistLength, setWishlistLength] = useState(null);

  useEffect(() => {
    firebaseDB
      .collection("Users")
      .doc(currentUser.uid)
      .collection("Collection")
      .get()
      .then((querySnapshot) => {
        const collectionLength = querySnapshot.Wv.docChanges.length;
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
        const collectionLength = querySnapshot.Wv.docChanges.length;
        setWishlistLength(collectionLength);
      })
      .catch((err) => {
        console.log(err.message);
        setWishlistLength(0);
      });
  }, []);

  return (
    <div className="user-releases">
      <p className="user-releases header">Releases</p>
      <div className="releases-statistics">
        <a href={`/collection/${currentUser.displayName}`}>In Collection</a>
        <a href={`/collection/${currentUser.displayName}`}>
          {collectionLength}
        </a>
        <a href={`/wishlist/${currentUser.displayName}`}>In Wishlist</a>
        <a href={`/wishlist/${currentUser.displayName}`}>{wishlistLength}</a>
        <a href={`/uploaded/${currentUser.displayName}`}>Uploaded</a>
      </div>
    </div>
  );
}

export default UserReleases;

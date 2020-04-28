import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { firebaseDB } from "../Auth/FirebaseInit";
import CollectionGrid from "../Collection/CollectionGrid";
import ProfileNav from "../Navs/ProfileNav";
import "./profile.css";

function AddedBy() {
  const { currentUser } = useContext(AuthContext);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (currentUser) {
      firebaseDB
        .collection("Albums")
        .where("addedBy", "==", currentUser.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let album = doc.data();
            album.id = doc.id;
            console.log("querySnapshot", doc.data());
            setAlbums((prev) => {
              return [...prev, album];
            });
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [currentUser]);
  if (!currentUser) {
    return (
      <h3>
        Please, <a href="/login">login</a> to see albums uploaded by you.
      </h3>
    );
  }

  return (
    <div>
      <ProfileNav />
      <div className="addedBy container">
        <h3>Your uploads</h3>
        <CollectionGrid collection={albums} sort="newest" />
      </div>
    </div>
  );
}

export default AddedBy;

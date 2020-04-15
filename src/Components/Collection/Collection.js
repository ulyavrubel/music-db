import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { firebaseDB } from "../Auth/FirebaseInit";
import ProfileNav from "../ProfileNav";
import viewGrid from "../../img/view-grid.svg";
import viewRows from "../../img/view-rows.svg";
import CollectionGrid from "./CollectionGrid";
import CollectionRows from "./CollectionRows";

import "./collection.css";

function Collection() {
  const { currentUser } = useContext(AuthContext);
  const [collection, setCollection] = useState([]);
  const [sort, setSort] = useState("newest");
  const [grid, setGrid] = useState(true);
  const [rows, setRows] = useState(false);

  useEffect(() => {
    if (currentUser) {
      let collectionRef = firebaseDB
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Collection");
      if (sort === "newest") {
        collectionRef.orderBy("date");
      }
      collectionRef
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const albumId = doc.data().album;
            const addedDate = doc.data().date;
            const inCollectionId = doc.id;
            const albumRef = firebaseDB.collection("Albums").doc(albumId);
            albumRef
              .get()
              .then((doc) => {
                if (doc.exists) {
                  const album = doc.data();
                  album.id = doc.id;
                  album.addedDate = addedDate; //saves firebase timestamp
                  album.inCollectionId = inCollectionId;
                  setCollection((prev) => {
                    return [...prev, album];
                  });
                } else {
                  console.log("No such document!");
                }
              })
              .catch((err) => {
                console.log(err.message);
              });
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [currentUser]);

  const handleChange = (event) => {
    event.preventDefault();
    setSort(event.target.value);
  };

  const handleGrid = (event) => {
    event.preventDefault();
    setGrid(true);
    setRows(false);
  };

  const handleRows = (event) => {
    event.preventDefault();
    setGrid(false);
    setRows(true);
  };

  if (!currentUser) {
    return <h3>Please, login to see collection</h3>;
  }

  return (
    <div>
      <ProfileNav />
      <div className="collection nav">
        <div>
          <label>Sort by</label>
          <select
            className="collection select"
            id="sort"
            onChange={handleChange}
          >
            <option value="newest" className="collection nav option">
              Newest
            </option>
            <option value="artist" className="collection nav option">
              Artist
            </option>
            <option value="album" className="collection nav option">
              Album
            </option>
            <option value="genre" className="collection nav option">
              Genre
            </option>
            <option value="released" className="collection nav option">
              Year
            </option>
          </select>
        </div>

        <div className="view container">
          <div className="view square" onClick={handleGrid}>
            <img src={viewGrid} alt="..."></img>
          </div>
          <div className="view square" onClick={handleRows}>
            <img src={viewRows} alt="..."></img>
          </div>
        </div>
      </div>
      {grid ? <CollectionGrid collection={collection} sort={sort} /> : null}
      {rows ? <CollectionRows collection={collection} sort={sort} /> : null}
    </div>
  );
}

export default Collection;

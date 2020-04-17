import React, { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { firebaseDB } from "../Auth/FirebaseInit";
import ProfileNav from "../ProfileNav";
import viewGrid from "../../img/view-grid.svg";
import viewRows from "../../img/view-rows.svg";
import CollectionGrid from "./CollectionGrid";
import CollectionRows from "./CollectionRows";

import "./collection.css";

function Collection() {
  const step = 5;

  const { currentUser } = useContext(AuthContext);
  const [collection, setCollection] = useState([]);
  const [collectionToShow, setCollectionToShow] = useState([]);
  const [sort, setSort] = useState("newest");
  const [grid, setGrid] = useState(true);
  const [rows, setRows] = useState(false);
  const [indexFrom, setIndexFrom] = useState(1);
  const [indexTo, setIndexTo] = useState(step);
  const [collectionLength, setCollectionLength] = useState(0);
  const [showNext, setShowNext] = useState(true);
  const [showPrev, setShowPrev] = useState(false);

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
                  setCollectionLength((prev) => prev + 1);
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

  useEffect(() => {
    let newColl = collection.slice(indexFrom - 1, indexTo);
    setCollectionToShow(newColl);
  }, [collection, indexTo, indexFrom]);

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

  const handlePrev = () => {
    if (indexFrom === 1) {
      setShowPrev(false);
      return;
    }
    if (indexTo === collectionLength) {
      let curFrom = indexFrom;
      setIndexFrom((prev) => prev - step);
      setIndexTo((prev) => prev - (prev - curFrom + 1));
      setShowNext(true);
    } else {
      if (indexFrom - step >= 1) {
        setIndexFrom((prev) => prev - step);
        setIndexTo((prev) => prev - step);
        setShowNext(true);
      }
      if (indexFrom - step === 1) {
        setShowPrev(false);
      }
    }
  };

  const handleNext = () => {
    if (indexTo === collectionLength) {
      return;
    }
    if (indexTo + step <= collectionLength) {
      setIndexFrom((prev) => prev + step);
      setIndexTo((prev) => prev + step);
      setShowPrev(true);
    } else {
      setIndexFrom((prev) => prev + step);
      setIndexTo(collectionLength);
      setShowPrev(true);
      setShowNext(false);
    }
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
      {grid ? (
        <CollectionGrid collection={collectionToShow} sort={sort} />
      ) : null}
      {rows ? (
        <CollectionRows collection={collectionToShow} sort={sort} />
      ) : null}
      {collectionLength > step ? (
        <div className="collection navigation">
          <p>
            {indexFrom} - {indexTo} of {collectionLength}
          </p>
          <div className="collection navigation buttons">
            {showPrev ? (
              <button
                className="auth submit navigation"
                onClick={handlePrev}
              >{`< Previous`}</button>
            ) : null}
            {showNext ? (
              <button
                className="auth submit navigation"
                onClick={handleNext}
              >{`Next >`}</button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Collection;

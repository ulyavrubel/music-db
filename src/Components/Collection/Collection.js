import React, { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { firebaseDB } from "../Auth/FirebaseInit";
import ProfileNav from "../ProfileNav";
import CollectionGrid from "./CollectionGrid";
import CollectionRows from "./CollectionRows";
import AlbumsNav from "../AlbumsNav";
import Pagination from "../Pagination";

import "./collection.css";

function Collection(props) {
  const step = 10;

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
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    if (currentUser) {
      let collectionRef = firebaseDB
        .collection("Users")
        .doc(currentUser.uid)
        .collection(props.collection);
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
  }, [currentUser, rerender]);

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

  const handleRender = () => {
    setCollection([]);
    setIndexFrom(1);
    setIndexTo(step);
    setCollectionLength(0);
    setRerender(!rerender);
  };

  if (!currentUser) {
    return (
      <h3>
        Please, <a href="/login">login</a> to see {props.collection}
      </h3>
    );
  }

  return (
    <div>
      <ProfileNav />
      <AlbumsNav
        handleChange={handleChange}
        handleGrid={handleGrid}
        handleRows={handleRows}
      />

      {grid ? (
        <CollectionGrid collection={collectionToShow} sort={sort} />
      ) : null}
      {rows ? (
        <CollectionRows
          collectionName={props.collection}
          collection={collectionToShow}
          sort={sort}
          handleRender={handleRender}
        />
      ) : null}
      <Pagination
        collectionLength={collectionLength}
        step={step}
        indexFrom={indexFrom}
        indexTo={indexTo}
        showPrev={showPrev}
        showNext={showNext}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
}

export default Collection;

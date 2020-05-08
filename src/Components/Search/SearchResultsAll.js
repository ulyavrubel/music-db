import React, { useState, useEffect } from "react";
import SearchResultsNav from "./SearchResultsNav";
import Pagination from "../Pagination";
import { firebaseDB } from "../Auth/FirebaseInit";
import CollectionGrid from "../Collection/CollectionGrid";
import NothingFound from "./NothingFound";
import Sort from "../Sort";

function SearchResultsAll(props) {
  const step = 5;
  const [sort, setSort] = useState("newest");
  const [indexFrom, setIndexFrom] = useState(1);
  const [indexTo, setIndexTo] = useState(step);
  const [collectionLength, setCollectionLength] = useState(0);
  const [showNext, setShowNext] = useState(true);
  const [showPrev, setShowPrev] = useState(false);
  const [resultTitle, setResultTitle] = useState([]);
  const [resultArtist, setResultArtist] = useState([]);
  const [resultLabel, setResultLabel] = useState([]);
  const [resultsToShow, setResultsToShow] = useState([]);
  const [type, setType] = useState("all");

  const [showNothing, setShowNothing] = useState(false);

  useEffect(() => {
    setType(props.location.pathname.split("/")[3]);
  }, [props]);

  useEffect(() => {
    firebaseDB
      .collection("Albums")
      .where("title", "==", props.q)
      .get()
      .then((querySnapshot) => {
        setResultTitle([]);
        querySnapshot.forEach((doc) => {
          let album = doc.data();
          album.id = doc.id;
          console.log("querySnapshot", doc.data());
          setResultTitle((prev) => {
            return [...prev, album];
          });
        });
      })
      .catch((err) => {
        if (err) {
          console.log("Error getting documents", err.message);
        }
      });
    firebaseDB
      .collection("Albums")
      .where("artist", "==", props.q)
      .get()
      .then((querySnapshot) => {
        setResultArtist([]);
        querySnapshot.forEach((doc) => {
          let album = doc.data();
          album.id = doc.id;
          console.log("querySnapshot", doc.data());
          setResultArtist((prev) => {
            return [...prev, album];
          });
        });
      })
      .catch((err) => {
        if (err) {
          console.log("Error getting documents", err.message);
        }
      });
    firebaseDB
      .collection("Albums")
      .where("label", "==", props.q)
      .get()
      .then((querySnapshot) => {
        setResultLabel([]);
        querySnapshot.forEach((doc) => {
          let album = doc.data();
          album.id = doc.id;
          console.log("querySnapshot", doc.data());
          setResultLabel((prev) => {
            return [...prev, album];
          });
        });
      })
      .catch((err) => {
        if (err) {
          console.log("Error getting documents", err.message);
        }
      });
  }, [props, type]);

  useEffect(() => {
    if (type === "all") {
      setResultsToShow(resultTitle.concat(resultArtist).concat(resultLabel));
    } else if (type === "release") {
      setResultsToShow(resultTitle);
    } else if (type === "artist") {
      setResultsToShow(resultArtist);
    } else if (type === "label") {
      setResultsToShow(resultLabel);
    }
  }, [type, resultTitle, resultArtist, resultLabel]);

  useEffect(() => {
    if (resultsToShow.length === 0) {
      setShowNothing(true);
    } else {
      setShowNothing(false);
      setCollectionLength(resultsToShow.length);
    }
  }, [resultsToShow]);

  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setSort(event.target.value);
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

  return (
    <div className="search marg-t-xxl">
      <SearchResultsNav q={props.q} />
      <h3 className="search__header">
        Results for <span className="search__header--span">{props.q}</span>
      </h3>

      {showNothing ? (
        <NothingFound />
      ) : (
        <div className="navbar-albums">
          <Sort onChange={handleChange} />
        </div>
      )}

      <CollectionGrid collection={resultsToShow} sort={sort} />
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

export default SearchResultsAll;

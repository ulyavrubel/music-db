import React, { useState, useEffect } from "react";
import SearchResultsNav from "./SearchResultsNav";
import AlbumsNav from "../AlbumsNav";
import "./searchResults.css";
import Pagination from "../Pagination";
import { searchRelease } from "../Helpers/searchDB";
import { firebaseDB } from "../Auth/FirebaseInit";
import SearchAll from "./SearchAll";
import SearchType from "./SearchType";

function SearchResultsAll(props) {
  const step = 5;
  const [sort, setSort] = useState("newest");
  const [grid, setGrid] = useState(true);
  const [rows, setRows] = useState(false);
  const [indexFrom, setIndexFrom] = useState(1);
  const [indexTo, setIndexTo] = useState(step);
  const [collectionLength, setCollectionLength] = useState(0);
  const [showNext, setShowNext] = useState(true);
  const [showPrev, setShowPrev] = useState(false);
  const [result, setResult] = useState([]);
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(props.q);
    setType(props.location.pathname.split("/")[3]);
    console.log(
      "SearchResultsAll props",
      props.location.pathname.split("/")[3]
    );
  });

  useEffect(() => {
    const getAlbums = async () => {
      const res = await searchRelease(search);
      setResult(res);
    };
    getAlbums();
  }, [search]);

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

  return (
    <div className="serachResults container">
      <SearchResultsNav q={props.q} />
      <h3>Results for {props.q}</h3>
      <AlbumsNav
        handleChange={handleChange}
        handleGrid={handleGrid}
        handleRows={handleRows}
      />
      {type === "all" ? (
        <SearchAll q={props.q} type={type} />
      ) : (
        <SearchType q={props.q} type={type} />
      )}

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

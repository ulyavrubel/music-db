import React, { useState, useEffect } from "react";
import { firebaseDB } from "../Auth/FirebaseInit";
import AlbumCard from "../Paths/AlbumCard";
import { addToDBCollection } from "../Helpers/addToDBCollection";

function Preview(props) {
  const [uploaded, setUploaded] = useState(false);
  const [album, setAlbum] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setAlbum(props.release);
    setError(null);
  }, [props]);

  useEffect(() => {
    let targetGenre = "";
    let genres = props.release.genre;
    for (let genre in genres) {
      if (genres[genre] === true) {
        targetGenre = genre;
      }
    }

    setAlbum((prev) => {
      return { ...prev, genre: targetGenre };
    });
  }, [props]);

  let {
    currentUser,
    url,
    artist,
    title,
    label,
    format,
    country,
    released,
    addCollection,
  } = props.release;

  const handleSubmit = (event) => {
    event.preventDefault();
    let albumAdd = {
      addedBy: currentUser.uid,
      addedToDB: new Date(),
      url: url,
      artist: artist,
      title: title,
      label: label,
      format: format,
      released: released,
      country: country,
      genre: album.genre,
    };

    let values = Object.values(albumAdd);
    if (values.some((item) => item === "" || item === null)) {
      setError("Please fill all the required fields and try again");
    } else {
      firebaseDB
        .collection("Albums")
        .add(albumAdd)
        .then((result) => {
          firebaseDB
            .collection("Users")
            .doc(currentUser.uid)
            .collection("Activity")
            .add({
              log: "added to Database",
              album: result.id,
              date: new Date(),
            })
            .then((result) => {
              console.log("Added to activity log", result);
            })
            .catch((err) => {
              console.log(err.message);
            });
          if (addCollection) {
            addToDBCollection(currentUser.uid, "Collection", result.id);
          }
          console.log(result);
          setUploaded(true);
          console.log("Added to database");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  if (uploaded) {
    return (
      <div className="upload-success">
        <h2>Your album was successfully uploaded!</h2>
      </div>
    );
  } else {
    return (
      <div style={uploaded ? { display: "none" } : { display: "block" }}>
        <h3 className="upload-header">Preview</h3>
        <div className="upload-container upload-container--preview">
          <AlbumCard album={album} />
          <button
            className="btn btn-black btn-black--preview"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {error ? <p>{error}</p> : null}
      </div>
    );
  }
}

export default Preview;

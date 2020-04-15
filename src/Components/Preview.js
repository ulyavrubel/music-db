import React, { useState } from "react";
import { firebaseDB } from "./Auth/FirebaseInit";

function Preview(props) {
  const [uploaded, setUploaded] = useState(false);
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

  let targetGenre = "";
  let genres = props.release.genre;
  for (let genre in genres) {
    if (genres[genre] === true) {
      targetGenre = genre;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let album = {
      addedBy: currentUser.uid,
      url: url,
      artist: artist,
      title: title,
      format: format,
      released: released,
      country: country,
      genre: targetGenre,
    };
    console.log(album);
    firebaseDB
      .collection("Albums")
      .add(album)
      .then((result) => {
        if (addCollection) {
          firebaseDB
            .collection("Users")
            .doc(currentUser.uid)
            .collection("Collection")
            .add({ album: result.id, date: new Date() })
            .then((result) => {
              console.log("Added to collection", result);
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
        console.log(result);
        setUploaded(true);
        console.log("Added to database");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  if (uploaded) {
    return (
      <div className="upload success">
        <h2>Your album was successfully uploaded!</h2>
      </div>
    );
  } else {
    return (
      <div style={uploaded ? { display: "none" } : { display: "block" }}>
        <h3 className="upload header">Preview</h3>
        <div className="upload container preview">
          <div className="preview box">
            <img className="preview img" src={url} alt=".."></img>
            <div className="preview info">
              <h5>
                {artist} - {title}
              </h5>
              <p>
                <span>Label </span>
                {label}
              </p>
              <p>
                <span>Format </span>
                {format}
              </p>
              <p>
                <span>Country </span>
                {country}
              </p>
              <p>
                <span>Year </span>
                {released}
              </p>
              <p>
                <span>Genre </span>
                {targetGenre}
              </p>
            </div>
          </div>
          <button className="auth submit preview" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Preview;

import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import Subscribe from "./Subscribe";
import { firebaseDB } from "../Auth/FirebaseInit";
import RecentlyAddedGrid from "./RecentlyAddedGrid";
import "./main.css";

function MainPageContent() {
  const [recentlyAdded, setRecentlyAdded] = useState([]);

  useEffect(() => {
    const ref = firebaseDB.collection("Albums").orderBy("addedToDB", "desc");
    ref
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          if (doc.exists) {
            const album = doc.data();
            album.id = doc.id;
            setRecentlyAdded((prev) => {
              return [...prev, album];
            });
          } else {
            console.log("No such document!");
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <Hero />
      <Subscribe />
      <RecentlyAddedGrid albums={recentlyAdded} />
    </div>
  );
}

export default MainPageContent;

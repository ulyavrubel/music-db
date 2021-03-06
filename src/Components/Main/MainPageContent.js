import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import Subscribe from "./Subscribe";
import { firebaseDB } from "../Auth/FirebaseInit";
import RecentlyAddedGrid from "./RecentlyAddedGrid";

function MainPageContent() {
  const [recentlyAdded, setRecentlyAdded] = useState([]);

  useEffect(() => {
    const ref = firebaseDB.collection("Albums").orderBy("addedToDB", "desc");
    ref
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
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

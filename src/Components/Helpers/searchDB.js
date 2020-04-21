import { firebaseDB } from "../Auth/FirebaseInit";

export const searchRelease = (title) => {
  let albums = [];
  firebaseDB
    .collection("Albums")
    .where("title", "==", title)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let album = doc.data();
        console.log("querySnapshot", doc.data());
        albums.push(album);
        console.log("finded albums", albums);
      });
    })
    .catch((err) => {
      if (err) {
        console.log("Error getting documents", err.message);
      }
    });
  console.log("finded albums all", albums);
  return albums;
};

import { firebaseDB } from "../Auth/FirebaseInit";

export const searchRelease = (type, query) => {
  let albums = [];
  firebaseDB
    .collection("Albums")
    .where(type, "==", query)
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

export const searchReleaseAll = (query) => {
  const getAlbums = async (query) => {
    let byArtist = await searchRelease("artist", query);
    let byTitle = await searchRelease("title", query);
    let byLabel = await searchRelease("label", query);
    const albums = byArtist.concat(byTitle).concat(byLabel);

    return albums;
  };

  getAlbums(query);
};

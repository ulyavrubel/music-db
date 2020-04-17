import { firebaseDB } from "../Auth/FirebaseInit";

export const addToDBCollection = (user, collection, id) => {
  firebaseDB
    .collection("Users")
    .doc(user)
    .collection(collection)
    .add({ album: id, date: new Date() })
    .then((result) => {
      console.log("Added to collection", result);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

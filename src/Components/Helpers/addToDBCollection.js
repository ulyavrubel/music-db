import { firebaseDB } from "../Auth/FirebaseInit";

export const addToDBCollection = (user, collection, id) => {
  firebaseDB
    .collection("Users")
    .doc(user)
    .collection(collection)
    .add({ album: id, date: new Date() })
    .then((result) => {
      console.log(`Added to ${collection}`, result);
      firebaseDB
        .collection("Users")
        .doc(user)
        .collection("Activity")
        .add({ log: `added to ${collection}`, album: id, date: new Date() })
        .then((result) => {
          console.log("Added to activity log", result);
        })
        .catch((err) => {
          console.log(err.message);
        });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

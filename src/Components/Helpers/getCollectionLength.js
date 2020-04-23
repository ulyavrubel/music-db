import { firebaseDB } from "../Auth/FirebaseInit";

export const getCollectionLength = (userId, collection) => {
  firebaseDB
    .collection("Users")
    .doc(userId)
    .collection(collection)
    .get()
    .then((querySnapshot) => {
      let collectionLength = querySnapshot.Wv.docChanges.length;
      console.log(collectionLength);
      return collectionLength;
    })
    .catch((err) => {
      console.log(err.message);
      return 0;
    });
};

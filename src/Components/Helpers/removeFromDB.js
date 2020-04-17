import { firebaseDB } from "../Auth/FirebaseInit";

export const removeFromDB = (user, collection, id) => {
  firebaseDB
    .collection("Users")
    .doc(user)
    .collection(collection)
    .doc(id)
    .delete()
    .catch((err) => {
      console.log(err.message);
    });
};

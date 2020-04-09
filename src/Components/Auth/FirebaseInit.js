import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyA71xx5FC5XQjA81o_-EwtNmty38Fh7oAs",
  authDomain: "music-db-f0d09.firebaseapp.com",
  databaseURL: "https://music-db-f0d09.firebaseio.com",
  projectId: "music-db-f0d09",
  storageBucket: "music-db-f0d09.appspot.com",
  messagingSenderId: "148541303421",
  appId: "1:148541303421:web:20faa12a3dcc24f9d21f14",
};

export const firebaseAuth = firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();

export const firebaseDB = firebase.firestore();

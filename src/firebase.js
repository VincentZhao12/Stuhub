import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDdmVs8apKCxfzKoBnPr-xB2Gu6BS9imZc",
  authDomain: "stuhub-56a84.firebaseapp.com",
  projectId: "stuhub-56a84",
  storageBucket: "stuhub-56a84.appspot.com",
  messagingSenderId: "395525969501",
  appId: "1:395525969501:web:8bd5d9811a27accd641fb4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export const db = firebase.firestore();

export const auth = firebase.auth();

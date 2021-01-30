import firebase from "firebase";
const admin = require("firebase-admin");

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
export const db = firebase.firestore();
const storageRef = firebase.storage().ref();

export const createNewClass = () => {
  const doc = db.collection("classes").doc();

  doc.set({});

  return doc.id;
};

export const addVideo = async (file, classId, title, description) => {
  const date = new Date();

  const lecture = {
    src: file,
    title: title,
    description: description,
    date: date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear(),
  };

  console.log(lecture);

  await db
    .collection("classes")
    .doc(classId)
    .collection("lectures")
    .doc(file)
    .set({ data: lecture });
};

export default firebase;

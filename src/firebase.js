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

  console.log(file, classId, title, description)

  const lecture = {
    src: file,
    title: title,
    description: description,
    date: date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear(),
  };

  await db
    .collection("classes")
    .doc(classId)
    .collection("lectures")
    .doc(file)
    .set({ data: lecture });
};

export const addMaterial = async (file, classId, title, description) => {
  const date = new Date();

  const material = {
    src: file,
    title: title,
    description: description,
    date: date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear(),
  };

  console.log(classId);

  await db
    .collection("classes")
    .doc(classId)
    .collection("materials")
    .doc(file)
    .set({ data: material });
};

export const createUser = async () => {
  await db.collection("users").doc(auth.currentUser.uid).set({
    studentClasses: [],
    teacherClasses: [],
  });
}
export const getClassesFromUser = async () => {
  //const classQuery = await db.collection("users").doc(auth.currentUser.uid).get();
    const data = await (await db.collection("users").doc(auth.currentUser.uid).get()).data();



  console.log("method", data.studentClasses);

  const classesArray = await data.studentClasses
  return classesArray;
}

//is the getVideos class good?
export const getVideos = async (classroom) => {

  const fetchData = async() => {
    const data = await db.collection("classes").doc(classroom).collection("lectures").get();
    return data.docs.map(doc => {
      return doc.data()
    });
  }


  return await fetchData();
}
export const getMaterials = async (classroom) => {
  

  const fetchData = async() => {
    const data = await db.collection("classes").doc(classroom).collection("materials").get();
    return data.docs.map(doc => {
      return doc.data()
    });
  }


  return await fetchData();
}

export default firebase;

export const auth = firebase.auth();

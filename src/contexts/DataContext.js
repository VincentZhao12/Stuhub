import React, { createContext, useContext, useState } from "react";
import { db, storage } from "../firebase";
import { useAuth } from './AuthContext';

// to use the stuff in the context do: 
// const {the stuff you want ex: userData, updateUserData} = useData();

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
}

export const DataProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [classData, setClassData] = useState({});
    const [currentClass, setCurrentClass] = useState("");
    const { currentUser } = useAuth();

    const updateUserData = async () => {
        // firebase stuff, setUserData to what u get from db

        const userRef = await db.collection("users").doc(currentUser.uid).get();
        setUserData(userRef.data());
    }

    const updateClassData = async () => {
        // firebase stuff, setClassData to what u get from db
        const classesRef = await db.collection("classes").get();
        
        let classes = {};

        classesRef.docs.forEach(async (doc) => {
            // const lectureRef = await db.collection("classes").doc(doc.id).collection("lectures").get();

            // let lectures = lectureRef.docs.map(_doc => ({..._doc.data(), id: _doc.id}));
            
            // const materialRef = await db.collection("classes").doc(doc.id).collection("materials").get();

            // let materials = materialRef.docs.map(_doc => ({..._doc.data(), id: _doc.id}));

            classes[doc.id] = doc.data();
            classes[doc.id].id = doc.id;
            // classes[doc.id].lectures = lectures;
            // classes[doc.id].materials = materials;
            setClassData(classes);
        });

        
    }

    const addUser = async (uid) => {
        // firebase stuff to add a user

        await db.collection("users").doc(uid).set({
            id: uid,
            studentClasses: [],
            teacherClasses: []
        });
    }

    const enrollClass = async (classId) => {
        // enroll the user in a class

        await db.collection("users").doc(currentUser.uid).update({
            studentClasses: [...userData.studentClasses, classId]
        });
    }

    const createClass = async (name, description) => {
        // create a new class
        
        const doc = db.collection("classes").doc();

        doc.set({
            id: doc.id,
            name: name,
            description: description,
            creator: currentUser.uid
        });

        console.log(userData);

        await db.collection("users").doc(currentUser.uid).update({
            teacherClasses: [...userData.teacherClasses, doc.id]
        });
    }

    const createLecture = async (name, description, file) => {
        // upload a lecture and add the information about the lecture to firestorec

        const doc = db.collection("classes").doc(currentClass).collection("lectures").doc();
        const ref = storage.ref(currentClass + "/lectures/" + doc.id);
        ref.put(file).then((url) => {
            ref.getDownloadURL().then((url) => {
                doc.set({
                    id:doc.id,
                    name: name,
                    description: description,
                    url: url
                });
            })
        });
    }

    const createMaterial = async (name, description, file) => {
        // upload a material and add the information about the material to firestorec

        const doc = db.collection("classes").doc(currentClass).collection("materials").doc();
        const ref = storage.ref(currentClass + "/materials/" + doc.id);
        ref.put(file).then(() => {
            ref.getDownloadURL().then((url) => {
                doc.set({
                    id:doc.id,
                    name: name,
                    description: description,
                    url: url
                });
            })
        });
    }

    const value = {
        userData, 
        classData,
        updateUserData,
        updateClassData,
        currentClass,
        setCurrentClass, 
        addUser, 
        enrollClass,
        createClass,
        createLecture,
        createMaterial,
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}
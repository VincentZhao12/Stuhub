import React, { createContext, useContext, useState } from "react";
import { db } from "../firebase";
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

    }

    const addUser = async () => {
        // firebase stuff to add a user
    }

    const enrollClass = async () => {
        // enroll the user in a class
    }

    const createClass = async () => {
        // create a new class
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
        createClass
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}
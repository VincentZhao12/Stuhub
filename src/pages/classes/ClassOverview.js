import React, { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';

const ClassOverview = () => {
    const { currentClass, classData, updateClasses } = useData();
    const [thisClassData, setThisClassData] = useState({});

    useEffect(() => {
        // redirect user if not signed in
        // update classes, then set the data of the current class to the class variable
    }, [])

    return (
        <>
            {/* Display the lectures here */}
        </>
    )
}

export default ClassOverview;s
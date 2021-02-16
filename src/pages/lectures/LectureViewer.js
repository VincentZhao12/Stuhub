import React, { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';

const LectureViewer = ({ match }) => {
    const { currentClass, classData, updateClasses } = useData();
    const lectureId = match.params.lecture;
    const [lectureLink, setLectureLink] = useState("");
    const [lectureName, setLectureName] = useState("");
    const [lectureDesc, setLectureDesc] = useState("");

    useEffect(() => {
        // update classes and then set the material data
    }, []);

    return (
        <>
            {/* Video player to play lecture with title and description */}
        </>
    )
}

export default LectureViewer;
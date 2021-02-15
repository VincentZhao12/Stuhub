import React, { useEffect, useState } from 'react';

const LectureViewer = ({ match }) => {
    const { currentClass, classData, updateClasses } = useData();
    const lectureId = match.params.lecture;
    const [lectureLink, setlectureLink] = useState("");
    const [lectureName, setlectureName] = useState("");
    const [lectureDesc, setlectureDesc] = useState("");

    useEffect(() => {
        // update classes
    }, [])
}

return LectureViewer;
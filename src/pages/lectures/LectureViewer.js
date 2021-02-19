import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import ReactPlayer from 'react-player'
import { Container } from 'react-bootstrap';

const LectureViewer = ({ match }) => {
    const { currentClass, lectureData } = useData();
    const { currentUser } = useAuth();
    const lectureId = match.params.lecture;
    const [lectureLink, setLectureLink] = useState("");
    const [lectureName, setLectureName] = useState("");
    const [lectureDesc, setLectureDesc] = useState("");
    const history = useHistory();

    useEffect(() => {
        // update classes and then set the material data
        const lecture = lectureData[lectureId];
        console.log("lecture", lecture);
        if(!currentClass|| !currentUser || !lecture)
            history.push("/");
        else {
            setLectureLink(lecture.url);
            setLectureName(lecture.name);
            setLectureDesc(lecture.description);
        }
    }, []);

    return (
        <Container className="justify-content-center">
            {/* Video player to play lecture with title and description */}
            <h2>{lectureName}</h2>
            <ReactPlayer url={lectureLink} controls/>
            <p>{lectureDesc}</p>
        </Container>
    )
}

export default LectureViewer;
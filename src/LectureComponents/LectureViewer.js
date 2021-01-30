import React, { useState, useEffect } from "react";
import "./LectureViewer.css";
import firebase, { db } from "../firebase";
import { useClassCode } from "../stores";
import QierPlayer from 'qier-player';
import { Container, Row } from "react-bootstrap";

function LectureViewer({ match }) {
  const [videoSrc, setVideoSrc] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const classroom = useClassCode((state) => state.classCode);

  useEffect(() => {
    const fetchData = async () => {
      const data = await (await db.collection("classes").doc(classroom).collection("lectures").doc(match.params.video).get()).data();
      firebase.storage().ref(classroom + "/" + match.params.video).getDownloadURL().then((url) => {
        setVideoSrc(url);
      }).catch((error) => {
        console.log(error);
      });
      setVideoTitle(data.data.title);
      setVideoDesc(data.data.description);
    }
    fetchData();
  }, [classroom, match]);

  return (
    <Container>
      <Row>
        <div className="video">
          {videoSrc && <QierPlayer className="video" srcOrigin={videoSrc} />}
          <h1 className="video">{videoTitle}</h1>
          <h4 className="video">{videoDesc}</h4>
        </div>
      </Row>
    </Container>
  );
}

export default LectureViewer;

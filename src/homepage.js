import React, { useEffect, useState } from "react";
import { useClassCode } from "./stores";
import Alert from "react-bootstrap/Alert";
import MaterialViewer from "./MaterialComponents/MaterialViewer"
import { Button, Container } from "react-bootstrap";
import { auth, getClassesFromUser, getVideos, getMaterials } from "./firebase";
import { Link } from  "react-router-dom";

function Homepage() {
  const classroom = useClassCode((state) => state.classCode);
  const [studentClasses, setStudentClasses] = useState([])
  const [videos, setVideos] = useState([]);
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    getClassesFromUser().then((classes) => {
      setStudentClasses(classes);
    });
    getVideos(classroom).then((lectures) => {
      setVideos(lectures);
    });
    getMaterials(classroom).then((materials)=> {
      setMaterials(materials);
    });
  })

  if (auth.currentUser === null) {
    return (
      <Container>
        <Alert variant="danger">
          <Alert.Heading><h4 style={{textAlign: "center"}}>Login to get started</h4></Alert.Heading>
        </Alert>
      </Container>
    );
  } else {
    return (
      <Container>
        <ul>
          {studentClasses.map(_class => {
            <li key={_class}>{_class}</li>
          })}
          
        </ul>
        <MaterialViewer materials={materials}/>
      </Container>
    );
  }
}

export default Homepage;

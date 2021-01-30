import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useClassCode } from "../stores";
import firebase, { addVideo } from "../firebase";

function LectureEditor({ filematch }) {
  const classroom = useClassCode((state) => state.classCode);
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    console.log("class code", classroom);
    event.preventDefault();
    const storageRef = firebase.storage().ref(classroom + "/" + file.name);
    storageRef.put(file).then(() => {
      console.log("Uploaded a file");
    });
    addVideo(
      file.name,
      classroom,
      event.target.elements["title"].value,
      event.target.elements["description"].value
    );
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Title:</Form.Label>
        <Form.Control name="title" type="text" required />
        <Form.Label>Description:</Form.Label>
        <Form.Control name="description" type="text" required />
        <Form.Label>Video File:</Form.Label>
        <Form.Control
          name="upload"
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </>
    
  );
}

export default LectureEditor;

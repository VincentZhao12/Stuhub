import React from "react";
import { useClassCode } from "./stores";
import Alert from "react-bootstrap/Alert";
import { Button, Container, Form } from "react-bootstrap";

function Homepage() {
  const classroom = useClassCode((state) => state.classCode);

  if (classroom === "") {
    return (
      <Container>
        <Alert variant="danger">
          <Alert.Heading>Please enter a class code</Alert.Heading>
          <p>Click the plus in the top right and join a class.</p>
        </Alert>
      </Container>
    );
  } else {
    return <div />;
  }
}

export default Homepage;

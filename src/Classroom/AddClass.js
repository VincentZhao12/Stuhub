import React from "react";
import "./AddClass.css";
import { useClassCode } from "../stores";
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function AddClass(props) {
  const changeClass = useClassCode((state) => state.updateClass);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.elements["classcode"].value);
    changeClass(event.target.elements["classcode"].value);
    props.history.push("/");
  };

  return (
    <div className="popup-box">
      <div className="box">
        <h2 className="header">Add a Class Code</h2>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Control name="classcode" placeholder="Class Code" type="text" />
          <Button
            type="submit"
            style={{
              backgroundColor: "#4ECDC4",
              marginLeft: "10px",
              alignSelf: "center",
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default withRouter(AddClass);

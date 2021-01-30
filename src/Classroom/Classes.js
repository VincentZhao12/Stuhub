import React, { useState, useEffect } from "react";
import "./Classes.css";
import { useClassCode } from "../stores";
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { db, auth } from "../firebase";
import Table from "react-bootstrap/Table";

function AddClass(props) {
  const changeClass = useClassCode((state) => state.updateClass);
  const classroom = useClassCode((state) => state.classCode);

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const ref = await db.collection("users").doc(auth.currentUser.uid).get();
      setClasses(ref.data().studentClasses);
    }
    fetchData();
  },[])

  const renderClasses = (id, index) => {
    return (
      <tr key={index}>
        <td>{index}</td>
        <td>{id}</td>
      </tr>
    );
  };

  const handleSubmit = (event, db) => {
    event.preventDefault();
    console.log(event.target.elements["classcode"].value);
    changeClass(event.target.elements["classcode"].value);

    db.collection("users").doc(auth.currentUser.uid).update({ studentClasses: [...classes, event.target.elements["classcode"].value] });
  };

  const goToClass = (event) => {

  }

  return (
    <div>
      <div className="addClass">
        <h2 className="header">Enroll in a Class Code</h2>
        <Form className="form" onSubmit={(e) => handleSubmit(e, db)}>
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
      <div>
        <h2 className="header">Current Enrolled Classes</h2>

        {classes.length > 0 ? 
        (<Table striped>
          <tr>
            <th>#</th>
            <th>Class ID</th>
          </tr>
          <tr onClick={goToClass}>
            {classes.map((studentClass, index) => {
              <>
                <td>{index + 1}</td>
                <td>{studentClass}</td>
              </>
              
            })}
          </tr>
        </Table>) : 
        (<h4>Enter a class code above to enroll in a class!</h4>)}
        
      </div>
    </div>
  );
}

export default withRouter(AddClass);

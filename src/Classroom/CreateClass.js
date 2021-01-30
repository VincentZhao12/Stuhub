import { auth } from '../firebase';
import React, { useState, useEffect } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';
import { createNewClass, db } from '../firebase';
import { useClassCode } from '../stores';

function CreateClass() {
    const changeClass = useClassCode((state) => state.updateClass);
    const [classes, setClasses] = useState([]);
    const [classId, setClassId] = useState("");

    useEffect(() => {
        const fetchData = async() => {
          const ref = await db.collection("users").doc(auth.currentUser.uid).get();
          setClasses(ref.data().teacherClasses);
        }
        fetchData();
      },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        const classId = createNewClass(
            event.target.elements["className"].value,
            event.target.elements["classDescription"].value
        );
        db.collection("users").doc(auth.currentUser.uid).update({teacherClasses: [...classes, classId]});
        changeClass(classId);
        setClassId(classId);
    }
    return (
        <>
            {!classId ? 
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Class Name:</Form.Label>
                    <Form.Control name="className" />
                    <Form.Label>Class Description:</Form.Label>
                    <Form.Control name="classDescription" />
                    <Button type="submit">Create New Class</Button>
                </Form> 
                :
                <div>
                    <Alert variant="success">
                        <Alert.Heading><h4 style={{textAlign: "center"}}>Class was successfully created</h4></Alert.Heading>
                        Your class has been created, give your students this class ID to allow them to access your class. 
                        {classId}
                    </Alert>
                </div>
            }
            
        </>
    )
}

export default CreateClass;
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const EnrollClass = () => {
    const { enrollClass, userData, updateUserData, classData, updateClassData } = useData();
    const { currentUser } = useAuth();
    const [userClasses, setUserClasses] = useState([]);
    const history = useHistory();
    let called = false;
    const [error, setError] = useState("");

    useEffect(() => {
        // redirect user if not signed in
        if(!currentUser)
            history.push("/");
        else if (!called) {
            updateUserData().then(() => {
                if(userData.studentClasses && userData.teacherClasses)
                    setUserClasses(userData.studentClasses.concat(userData.teacherClasses));
            });
            updateClassData();
            called = true;
        }
    }, [currentUser, updateClassData, updateUserData, userData]);

    const handleSubmit = (event) => {
        // enroll the user into a class and then redirect them to the class
        event.preventDefault();
        const classId = event.target.elements["id"].value.trim();
        console.log(userClasses, classId);
        if(userClasses.includes(classId)) {
            setError("You are already either teaching or enrolled in this class");
        } else {
            enrollClass(classId);
        }
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center">
                <div className="w-100">
                    <Card>
                        <Card.Body>
                            {error && <Alert variant="danger"><Alert.Heading>Could not enroll in class</Alert.Heading>{error}</Alert>}
                            <h2 className="text-center">Create a new Class</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Class ID</Form.Label>
                                    <Form.Control name="id" required />
                                </Form.Group>
                                <Button type="submit" variant="custom-primary" className="w-100">Submit</Button>
                            </Form>
                            
                        </Card.Body>
                    </Card>
                </div>
            </Container>
            {/* Form for enrolling a user into a class */}
        </>
    )
}

export default EnrollClass;
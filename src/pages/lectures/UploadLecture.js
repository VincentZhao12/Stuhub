import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const UploadLecture = () => {
    const { currentUser } = useAuth();
    const { createLecture, currentClass, userData, updateUserData } = useData();
    const history = useHistory();
    const [file, setFile] = useState();

    useEffect(() => {
        // update classData, then if the current user is not the creator of the class, return to homepage
        if(!currentUser || !currentClass)
            history.push("/");
        else {
            updateUserData().then((userData) => {
                console.log(userData);
                console.log(currentClass);
                if(!userData.teacherClasses.includes(currentClass))
                    history.push("/");
            });
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        createLecture(
            event.target.elements["name"].value,
            event.target.elements["description"].value,
            file
        );
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center">
                <div className="w-100">
                    <Card>
                        <Card.Body>
                            <h2 className="text-center">Upload a Lecture</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Lecture Name</Form.Label>
                                    <Form.Control name="name" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Lecture Description</Form.Label>
                                    <Form.Control name="description" />
                                </Form.Group>
                                <Form.Control type="file" onChange={(event) => setFile(event.target.files[0])}/>
                                <Button type="submit" variant="custom-primary" className="w-100">Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
            {/* Form to upload the lecture */}
        </>
    )
}

export default UploadLecture;
import React, { useEffect } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const CreateClass = ({ props }) => {
    const { createClass, updateUserData } = useData();
    const { currentUser } = useAuth();
    const history = useHistory();
    let called = false;

    useEffect(() => {
        if(!currentUser) {
            history.push("/login");
        } else if(!called) {
            updateUserData();
            called = true;
        }
    }, [currentUser, history]);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(event);

        createClass(
            event.target.elements["name"].value,
            event.target.elements["description"].value
        ).then(() => history.push("/"));
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center">
                <div className="w-100">
                    <Card>
                        <Card.Body>
                            <h2 className="text-center">Create a new Class</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Class Name</Form.Label>
                                    <Form.Control name="name" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Class Description</Form.Label>
                                    <Form.Control name="description" />
                                </Form.Group>
                                <Button type="submit" variant="custom-primary" className="w-100">Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
            {/* A form for creating a class */}
        </>
    )
}

export default CreateClass;
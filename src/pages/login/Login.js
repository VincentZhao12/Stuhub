import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './styles.css'

const Login = () => {
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(event.target.elements["email"].value, event.target.elements["password"].value);

            history.push("/");
        } catch(error) {
            if(error.message === "There is no user record corresponding to this identifier. The user may have been deleted."){
                setError("Your email or password is not correct, or your account does not exist.")
            }
            else{
                setError("Failed to Log in")
            }
            
        }

        setLoading(false);
    }
    
    return (
        <Container className="d-flex align-items-center justify-content-center" styles={{height: "80vh"}}>
            <div className="w-100">
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Log In</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" type="email" />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" />
                            </Form.Group>
                            <Button className="w-100" type="submit" disabled={loading} variant="custom-primary" >
                                Log In
                            </Button>
                        </Form>
                    </Card.Body>
                    
                </Card>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </Container>
    )
}

export default Login;
import React, { useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { useData } from "../../contexts/DataContext";
import { auth } from "../../firebase";

export default function Signup() {
  const { signup, currentUser } = useAuth();
  const { addUser } = useData();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    if (event.target.elements["password"].value !== event.target.elements["password-confirm"].value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(event.target.elements["email"].value, event.target.elements["password"].value);
      addUser(auth.currentUser.uid);
      
      history.push("/");
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" name="password-confirm" required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit" variant="custom-primary" >
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
  )
}
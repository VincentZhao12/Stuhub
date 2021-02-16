import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import LandingImg from "../assets/LandingImg";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
    const { currentUser } = useAuth();
    const { userData, updateUserData, classData, updateClassData, setCurrentClass } = useData();
    const [userClasses, setUserClasses] = useState([]);

    useEffect(() => {
        // update user and class data, then setUserClasses to the user's classes to an array of objects using userData and classData
        // set the current class to the first class by default
        updateClassData();
    }, [])

    return (
        <>
            {currentUser ? (<></>) : (
                <Container>
                    <Row className="content">
                        <Col className="info ml-auto mr-auto" sm={8} md={6}>
                            <h1>Welcome to Stuhub!</h1>
                            <h2>The platform for easy classroom material management!</h2>
                            <Button variant="custom-secondary" as={Link} to="/login"> Get Started!</Button>
                        </Col>
                        <Col className="img ml-auto mr-auto" sm={8} md={6}>
                            <LandingImg/>
                        </Col>
                    </Row>
                </Container>
            )}
            {/* if the user is not logged in, display a landing page (see figma for what we want it to look like) */}
            {/* if the user is logged in and has classes, display a list of the users classes on the left and ClassOverview component on the right */}
            {/* if the user is logged in and doesn't have classes, display a page with a link to create / enroll in a class */}
        </>
    ); 
}

export default Homepage;
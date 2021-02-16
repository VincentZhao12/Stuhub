import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import LandingImg from "../assets/LandingImg";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

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
                <Container fluid className="mt-auto mb-auto">
                    <Row className="mt-auto mb-auto" md={{ span: 3, offset: 3 }}>
                        <Col className="col-md-6 col-md-offset-3" style={{paddingLeft: "17%"}}>
                            <br /><br />
                            <Row>
                                <h1>Welcome to Stuhub!</h1>
                            </Row>
                            <Row>
                                <h2>The platform for easy classroom material mangement!</h2>
                            </Row>
                            <Row style={{marginBottom: "30px"}}>
                                <Button variant="custom-secondary" as={Link} to="/login" style={{width: 500, fontSize: 25}}>Get Started!</Button>
                            </Row>
                            <br /><br />
                        </Col>
                        <Col style={{paddingLeft: "1%"}}>
                            <br /><br />
                            <LandingImg/>
                            <br /><br />
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
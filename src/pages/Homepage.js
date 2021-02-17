import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import LandingImg from "../assets/LandingImg";
import EmptyClassesImg from "../assets/EmptyClassesImg";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import './Homepage.scss';

// const classId = userData.studentClasses[0];
// const classStuff = classData[classId];
const Homepage = () => {
    const { currentUser } = useAuth();
    const { userData, updateUserData, classData, updateClassData, setCurrentClass, currentClass, createLecture, lectureData, materialData } = useData();
    const [userClasses, setUserClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userTeachClasses, setUserTeachClasses] = useState([]);

    useEffect(() => {
        // update user and class data, then setUserClasses to the user's classes to an array of objects using userData and classData
        // set the current class to the first class by default
        if(currentUser) {
            let classLoading = true;
            let userLoading = true;

            updateClassData().then(() => {
                classLoading = false;
                setLoading(classLoading || userLoading);
            })
            
            updateUserData().then((data) => {
                userLoading = false;
                setLoading(classLoading || userLoading);

                const allClasses = data.studentClasses.concat(data.teacherClasses);

                setCurrentClass(allClasses[0]);
                setUserClasses(data.studentClasses);
                setUserTeachClasses(data.teacherClasses);
            })
        }
    }, []);

    return (
        <>
            {loading ? (
            <>
            <Container className="page" style={{ height: "80vh", alignItems: "center"}}>
                <Row className="justify-content-center align-items-center content" style={{height:"80%"}}>
                    <Col className="col-10 col-md-5">
                    <Loader
                            className="loading ml-auto mr-auto"
                            type="BallTriangle"
                            color="#05668D"
                            height={100}
                            width={100}
                        /> 
                    </Col>
                </Row>
            </Container>
            </>)
            : <> {currentUser ? (
                <>
                    {userClasses && userClasses.length ? (
                    <>
                        <Container  fluid className="page" style={{height: "80vh", alignItems: "center"}}>
                            <Row className="px-4">
                                <Col className="col-6">
                                    <Row>
                                        <h2>Enrolled Classes</h2>
                                        {userClasses.map((classId, index) => {
                                            let className = classData[classId];
                                            return(
                                                <Row key={index}>{className.name}</Row>
                                            )
                                        })}
                                    </Row>
                                    <Row>
                                        <h2>Classes You Teach</h2>
                                    </Row>
                                </Col>
                                <Col className="col-10">
                                </Col>
                            </Row>
                        </Container>
                    </>) 
                    :(
                        <Container fluid className="page" style={{height: "80vh", alignItems: "center"}}>
                            <Row className="justify-content-center align-items-center content" style={{height:"80%"}}>
                                <Col className="col-10 col-md-5">
                                    <EmptyClassesImg className="img"/>
                                </Col>
                                <Col className="col-8 col-md-4 pt-5">
                                    <h2>Looks like you aren't enrolled in any classes</h2>
                                    <Button as={Link} to="/enroll-class" className="my-2" block variant="custom-primary">Enroll</Button>
                                    <Button as={Link} to="/create-class" className="my-2" block variant="custom-secondary">Create a Class</Button>
                                </Col>  
                            </Row>
                        </Container>
                    )}
                </>
                ) : (
                <Container className="page">
                    <Row className="content">
                        <Col className="info ml-auto col-8 col-md-5">
                            <div>
                                <h1 className="custom-primary-light">Welcome to Stuhub!</h1>
                                <h2>The platform for easy classroom material management!</h2>
                                <Button mr-auto variant="custom-secondary" block as={Link} to="/login"> Get Started!</Button>
                            </div>
                        </Col>
                        <Col className="img-col mr-auto col-8 col-md-4">
                            <LandingImg className="img"/>
                        </Col>
                    </Row>
                </Container>
            )}
            {/* if the user is not logged in, display a landing page (see figma for what we want it to look like) */}
            {/* if the user is logged in and has classes, display a list of the users classes on the left and ClassOverview component on the right */}

            {/* if the user is logged in and doesn't have classes, display a page with a link to create / enroll in a class */}</>}

        </>
    ); 
}

export default Homepage;
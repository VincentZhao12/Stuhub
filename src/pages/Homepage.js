import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import LandingImg from "../assets/LandingImg";
import EmptyClassesImg from "../assets/EmptyClassesImg";
import { Button, Container, Row, Col, Card, ListGroup, OverlayTrigger, Popover } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import './Homepage.scss';
import UnderlineText from '../UtilComponents/UnderlineText';
import ClassOverview from './classes/ClassOverview';
import { List } from "react-bootstrap-icons";

// const classId = userData.studentClasses[0];
// const classStuff = classData[classId];
const Homepage = () => {
    const { currentUser } = useAuth();
    const { userData, updateUserData, classData, updateClassData, setCurrentClass, currentClass, createLecture, lectureData, materialData } = useData();
    const [userClasses, setUserClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userTeachClasses, setUserTeachClasses] = useState([]);
    const [enrolledClassesSelected, setEnrolledClassesSelected] = useState(true);

    useEffect(() => {
        // update user and class data, then setUserClasses to the user's classes to an array of objects using userData and classData
        // set the current class to the first class by default
        if(currentUser) {
            let classLoading = true;
            let userLoading = true;

            updateClassData().then(() => {
                classLoading = false;
                setLoading(classLoading || userLoading);
                console.log(classData);
            })
            
            updateUserData().then((data) => {
                console.log(data)

                userLoading = false;
                setLoading(classLoading || userLoading);

                const allClasses = data.studentClasses.concat(data.teacherClasses);

                if(!currentClass)
                    setCurrentClass(allClasses[0]);
                setUserClasses(data.studentClasses);
                setUserTeachClasses(data.teacherClasses);

                setEnrolledClassesSelected(data.studentClasses.length);

                if(data.teacherClasses.includes(currentClass))
                    setEnrolledClassesSelected(false);
            })
        } else {
            setLoading(false);
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
                    {(userClasses && userClasses.length) || (userTeachClasses && userTeachClasses.length) ? (
                    // <>
                    //     <Container fluid className="page" style={{height: "80vh", alignItems: "center"}}>

                    //         <Col>
                    //             <Row className="">
                    //                 <UnderlineText style={{marginLeft: "25px"}} selected={enrolledClassesSelected} onClick={() => setEnrolledClassesSelected(true)}><h3 className="text mb-0">Enrolled</h3></UnderlineText>
                    //                 { userClasses.map((classId) => {
                    //                     return (
                    //                         <Row>
                    //                             <UnderlineText style={{marginRight: "25px", marginLeft: "25px", color: "black"}} key={classId} selected={classId === currentClass} onClick={() => setCurrentClass(classId)}><h3 className="text mb-0">{classData[classId].name}</h3></UnderlineText>
                    //                         </Row>
                    //                         )
                    //                 })}
                                    
                    //             </Row>
                    //             <Row>
                    //                 <UnderlineText style={{marginLeft: "25px"}} selected={!enrolledClassesSelected} onClick={() => setEnrolledClassesSelected(false)}><h3 className="text mb-0">Teaching</h3></UnderlineText>
                    //                 {userTeachClasses.map(classId => {
                    //                     return (
                    //                         <Row>
                    //                             <UnderlineText style={{marginRight: "25px", marginLeft: "25px", color: "black"}} key={classId} selected={classId === currentClass} onClick={() => setCurrentClass(classId)}><h3 className="text mb-0">{classData[classId].name}</h3></UnderlineText>
                    //                         </Row>    
                    //                         )
                    //                 })}
                    //             </Row>
                    //         </Col>
                    //         <Col>
                    //             <ClassOverview teacherClass={userTeachClasses.includes(currentClass)}/>
                    //         </Col>
                    //     </Container>
                    // </>
                    
                    <>
                        <Container fluid className="page" style={{height: "100vh", alignItems: "center"}}>
                            <Row className="px-3" style={{height:"100%"}}>
                                <Col  className="col-3 d-none d-md-block d-lg-block">
                                    <Row>
                                        <p className="h2 mb-0">Enrolled</p>
                                        <Container>
                                            { userClasses.map((classId) => {
                                                return (
                                                    <Row>
                                                        
                                                        <UnderlineText style={{marginRight: "25px", marginLeft: "25px", color: "black"}} key={classId} selected={classId === currentClass} onClick={() => setCurrentClass(classId)}><div     className="text mb-0">{classData[classId].name}</div   ></UnderlineText>
                                                    </Row>
                                                    )
                                            })}
                                        </Container>
                                        <h2 className="text mb-0">Teacher Classes</h2>
                                        <Container>
                                            {userTeachClasses.map(classId => {
                                                return (
                                                    <Row>
                                                        <UnderlineText style={{marginRight: "25px", marginLeft: "25px", color: "black"}} key={classId} selected={classId === currentClass} onClick={() => setCurrentClass(classId)}><div     className="text mb-0">{classData[classId].name}</div   ></UnderlineText>
                                                    </Row>    
                                                    )
                                            })}
                                        </Container>
                                    </Row>
                                </Col>
                                <Col  className="col-1 pr-5 px-0 d-md-none d-sm-block">
                                    
                                    <OverlayTrigger
                                        trigger="click"
                                        placement="bottom"
                                        style={{width: "100%", height:"100%"}}
                                        overlay={(
                                                <Popover style={{width: "100%", height:"100%"}}>
                                                <Popover.Content> 

                                                    <Container fluid>
                                                    <Col >
                                                        <Row>
                                                            <p className="h2 mb-0">Enrolled</p>
                                                            <Container>
                                                                { userClasses.map((classId) => {
                                                                    return (
                                                                        <Row>
                                                                            <UnderlineText style={{marginRight: "25px", marginLeft: "25px", color: "black"}} key={classId} selected={classId === currentClass} onClick={() => setCurrentClass(classId)}><div     className="text mb-0">{classData[classId].name}</div   ></UnderlineText>
                                                                        </Row>
                                                                        )
                                                                })}
                                                            </Container>
                                                            <h2 className="text mb-0">Teacher Classes</h2>
                                                            <Container>
                                                                {userTeachClasses.map(classId => {
                                                                    return (
                                                                        <Row>
                                                                            <UnderlineText style={{marginRight: "25px", marginLeft: "25px", color: "black"}} key={classId} selected={classId === currentClass} onClick={() => setCurrentClass(classId)}><div     className="text mb-0">{classData[classId].name}</div   ></UnderlineText>
                                                                        </Row>    
                                                                        )
                                                                })}
                                                            </Container>
                                                        </Row>
                                                    </Col>
                                                    </Container>
                                                </Popover.Content>
                                                </Popover>
                                        )}
                                            >
                                           <Button size="sm"><List/></Button>
                                        </OverlayTrigger>
                                </Col>
                                <Col className="ml-10">
                                    <ClassOverview teacherClass={userTeachClasses.includes(currentClass)}/>
                                </Col>
                            </Row>
                        </Container>
                    </>
                    
                    
                    )

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
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import HorizontalMenu from '../../UtilComponents/HorizontalMenu';

const ClassOverview = (props) => {
    const { currentClass, classData, lectureData, teacherClasses, materialData } = useData();
    const [thisClassData, setThisClassData] = useState({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const history = useHistory();

    useEffect(() => {
        // redirect user if not signed in
        // update classes, then set the data of the current class to the class variable

        if(!currentClass) {
            history.push("/");
        }
    }, [])

    return (
        <>
            {/* Display the lectures and materials here */}
            <Row>
                <Container className="text-center"><h2>{classData[currentClass].name}</h2></Container>
            </Row>
            <Row>
                <p>{classData[currentClass].description}</p>
            </Row>
            <Row>
                <Col><h2>Lectures</h2></Col>
                {props.teacherClass && <Col style={{marginLeft: "30%"}}><h2><Link to="/upload-lecture">Upload Lecture</Link></h2></Col>}
            </Row>
            <Row>
                  <h2 />
                  {Object.keys(lectureData).length ? <HorizontalMenu
                      elements={Object.keys(lectureData).map((lecture) => {
                          return (
                              <Card style={{marginLeft: "1%", marginRight: "1%", height: "12rem"}} key={lecture}>
                                  <Card.Body className="d-flex flex-column">
                                        <Card.Title>{lectureData[lecture].name}</Card.Title>
                                        <Card.Text>
                                            {lectureData[lecture].description}
                                        </Card.Text>
                                        <Link className="mt-auto" to={"/view-lecture/" + lecture}>View Lecture</Link>
                                  </Card.Body>
                              </Card>
                          )
                      })}
                      display={4}
                  /> : <p>This class does not have any Lectures</p>}
            </Row>
            <Row>
                <Col><h2>Materials</h2></Col>
                {props.teacherClass && <Col style={{marginLeft: "30%"}}><h2><Link to="/upload-material">Upload Material</Link></h2></Col>}
            </Row>
            <Row>
                  <h2 />
                  {Object.keys(materialData).length ? <HorizontalMenu
                      elements={Object.keys(materialData).map((material) => {
                          return (
                              <Card style={{marginLeft: "1%", marginRight: "1%", height: "12rem"}} key={material}>
                                  <Card.Body className="d-flex flex-column">
                                        <Card.Title>{materialData[material].name}</Card.Title>
                                        <Card.Text>
                                            {materialData[material].description}
                                        </Card.Text>
                                        <Link className="mt-auto" to={"/view-material/" + material}>View Material</Link>
                                  </Card.Body>
                              </Card>
                          )
                      })}
                      display={4}
                  /> : <p>This class does not have any materials</p>}
            </Row>
            <Row>
                <h2>Class ID: {currentClass}</h2>
            </Row>
        </>
    )
}

export default ClassOverview;
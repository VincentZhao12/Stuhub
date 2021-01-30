import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import MaterialViewer from "./MaterialComponents/MaterialViewer";
import AddClass from "./Classroom/AddClass";
import Homepage from "./homepage";
import { createNewClass } from "./firebase";
import { Navbar, Form, Dropdown, DropdownButton } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LectureEditor from "./LectureComponents/LectureEditor";
import LectureViewer from "./LectureComponents/LectureViewer";

// materials, lecture viewer, formatting

const Toggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

function App() {
  const [showAddClass, setShowAddClass] = useState(false);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* <Homepage /> */}

          <Navbar className="nav-bar" varient="light">
            <Navbar.Brand href="/">
              <h1 class="nav-text">Stuhub</h1>
            </Navbar.Brand>

            {/* Add hrefs for dropdown items */}
            <Form inline>
              <Dropdown alignRight id="dropdown-button-drop-left">
                <Dropdown.Toggle as={Toggle}>
                  <h1 className="nav-text">+</h1>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="/add-class"
                    onClick={() => setShowAddClass(!showAddClass)}
                  >
                    Add Class
                  </Dropdown.Item>
                  <Dropdown.Item href="#">Create Class</Dropdown.Item>
                  <Dropdown.Item href="/materials">Materials</Dropdown.Item>
                  <Dropdown.Item href="/lecture-upload">
                    Upload Lecture
                  </Dropdown.Item>
                  <Dropdown.Item href="/lecture-view-:video">
                    View Lecture
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form>

            {showAddClass && <AddClass />}
          </Navbar>
        </header>
        <button onClick={() => console.log(createNewClass())}>test</button>

        {/* <MaterialViewer /> */}
      </div>
      <Link to="/lecture-view-_Retro53_preview.mp4">view</Link>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/add-class" component={AddClass} />
      <Route exact path="/lecture-upload" component={LectureEditor} />
      <Route exact path="/lecture-view-:video" component={LectureViewer} />
      <Route path="/materials" component={MaterialViewer} />

      {/* <Route path="/lectures" component={component} /> */}
    </Router>
  );
}

export default App;

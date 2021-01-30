import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import MaterialViewer from "./MaterialComponents/MaterialViewer";
import Classes from "./Classroom/Classes";
import Homepage from "./homepage";
import { Navbar, Form, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LectureEditor from "./LectureComponents/LectureEditor";
import LectureViewer from "./LectureComponents/LectureViewer";
import Signup from "./User/Signup";
import Login from "./User/Login";
import MaterialEditor from "./MaterialComponents/MaterialEditor";
import CreateClass from "./Classroom/CreateClass";

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
  
  return (
    <>
      <Router>
      <div className="App">
        <header className="App-header">
          {/* <Homepage /> */}

          <Navbar className="nav-bar" varient="light">
            <Navbar.Brand href="/">
              <h1 className="nav-text">Stuhub</h1>
            </Navbar.Brand>

            {/* Add hrefs for dropdown items */}
            <Form inline>
              {/* <h2 className="nav-text" variant="none"></h2> */}
              <Link to="/login"><h4 className="nav-text nav-item" >Login</h4></Link>

              <Dropdown alignRight id="dropdown-button-drop-left">
                <Dropdown.Toggle as={Toggle}>
                  <h2 className="nav-text nav-item">+</h2>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/classes">
                    <Link className="dropdown-item" to="/classes">
                      Classes
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item >
                     <Link className="dropdown-item" to="/material-upload">
                      Add Materials
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="dropdown-item" to="/lecture-upload">
                      Upload Lecture
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item >
                    <Link className="dropdown-item" to="/lecture-view-:video">
                      View Lecture
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </Navbar>
        </header>
      </div>

      <div className="content">
        {/* Router stuff */}
        <Route exact path="/" component={Homepage} />
        <Route exact path="/lecture-upload" component={LectureEditor} />
        <Route exact path="/lecture-view-:video" component={LectureViewer} />
        <Route exact path="/classes" component={Classes} />
        <Route exact path="/create-class" component={CreateClass} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route exact path='/material-upload' component={MaterialEditor}/>
        
      </div>

      {/* <Route path="/lectures" component={component} /> */}
    </Router>
    </>
  );
}

export default App;

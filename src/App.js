import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import Homepage from './pages/Homepage';
import Navigation from "./pages/Navigation";
import EnrollClass from "./pages/classes/EnrollClass"

import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/custom.scss';
import CreateClass from './pages/classes/CreateClass';
import UploadLecture from './pages/lectures/UploadLecture';
import UploadMaterial from './pages/materials/UploadMaterial';
import LectureViewer from './pages/lectures/LectureViewer';
import MaterialViewer from './pages/materials/MaterialViewer';

function App() {
  return (
    <>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Navigation />
              <Switch>
                {/* Put routes here */}
                <Route exact path="/" component={Homepage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/enroll-class" component={EnrollClass} />
                <Route exact path="/create-class" component={CreateClass} />
                <Route exact path="/upload-lecture" component={UploadLecture} />
                <Route exact path="/upload-material" component={UploadMaterial} />
                <Route exact path="/view-lecture/:lecture" component={LectureViewer} />
                <Route exact path="/view-material/:material" component={MaterialViewer} />
              </Switch>
          </Router>
        </DataProvider>
      </AuthProvider>
    </>
  );
}

export default App;

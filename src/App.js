import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import Homepage from './pages/Homepage';
import Navigation from "./pages/Navigation";

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';

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
              </Switch>
          </Router>
        </DataProvider>
      </AuthProvider>
    </>
  );
}

export default App;

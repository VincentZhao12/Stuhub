import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Container } from 'react-bootstrap';
import Homepage from './pages/Homepage';
import Navigation from "./pages/Navigation";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
              </Switch>
          </Router>
        </DataProvider>
      </AuthProvider>
    </>
  );
}

export default App;

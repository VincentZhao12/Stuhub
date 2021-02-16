import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import variables from '../scss/vars.scss';

const Navigation = () => {
    const { currentUser, logout } = useAuth();

    return (
        <>
            {/* A navbar with Stuhub on one side and a login signup button if they aren't signed in and a logout button if they are logged in */}
            <Navbar className="justify-content-between flex">
                <Navbar.Brand as={Link} to="/"><h2>Stuhub</h2></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {!currentUser ? (
                            <>
                                <Nav.Link as={Link} to="/login" style={{color: variables.primaryColor}}><h3>Login</h3></Nav.Link>
                                <Nav.Link as={Link} to="/signup"><h3>Signup</h3></Nav.Link>
                            </>
                        ) : 
                            <>
                                <Nav.Link as={Link} onClick={() => logout()} to="/" >Log Out</Nav.Link>
                            </>}
                        
                    </Nav>
                </Navbar.Collapse>                
            </Navbar>
        </>
    )
}

export default Navigation;
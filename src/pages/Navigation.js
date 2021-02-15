import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navigation.css'

const Navigation = () => {
    const { currentUser } = useAuth();

    return (
        <>
            {/* A navbar with Stuhub on one side and a login signup button if they aren't signed in and a logout button if they are logged in */}
            <Navbar>
                <Navbar.Brand as={Link} to="/">Stuhub</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                    </Nav>
                </Navbar.Collapse>                
            </Navbar>
        </>
    )
}

export default Navigation;
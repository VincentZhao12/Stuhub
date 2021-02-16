import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
    const { currentUser, logout } = useAuth();

    return (
        <>
            {/* A navbar with Stuhub on one side and a login signup button if they aren't signed in and a logout button if they are logged in */}
            <Navbar className="justify-content-between flex">
                <Navbar.Brand as={Link} to="/" style={{fontSize: 33}}>Stuhub</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {!currentUser ? (
                            <>
                                <Nav.Link as={Link} to="/login" style={{fontSize: 18}}>Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup" style={{fontSize: 18}}>Signup</Nav.Link>
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
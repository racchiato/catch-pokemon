import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import Link from 'next/link';

const NavbarComponent = () => {
    const [myPokeLength, setLength] = useState(0)
    useEffect(() => {
        if (localStorage !== undefined) {
            setLength(JSON.parse(localStorage.getItem('myPokemon')).length)
        }
    })
    return (
        <Navbar bg="primary" expand="lg" className="sticky-top">
            <Container>
                <Link href="/">
                    <Navbar.Brand href="/" className="text-white font-weight-bold">CATCH-THE-POKEMON</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link href="/my-pokemon">
                            <Nav.Link href="#home" className="text-white">MY POKEMON {`(${myPokeLength})`}</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent;
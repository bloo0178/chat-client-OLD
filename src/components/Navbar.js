import React from 'react';
import { Navbar, NavbarBrand, NavItem, NavLink, Nav } from 'reactstrap';


//https://stackoverflow.com/questions/49195684/set-color-to-reactsrap-navlink
const Navigation = (props) => {
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand>react.chat</NavbarBrand>
            <Nav className="ml-auto">
                <NavItem>
                    <NavLink href='/'>Groups</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/">Logout</NavLink>
                    </NavItem>
            </Nav>
        </Navbar>
    )
}

export default Navigation;
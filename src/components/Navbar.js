import React from 'react';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, NavItem, Nav } from 'reactstrap';
import { NavLink } from 'react-router-dom';

//https://stackoverflow.com/questions/49195684/set-color-to-reactsrap-navlink
const Navigation = (props) => {
    let logout = () => {
        if (props.channel) {
            props.channel.exit((response, error) => {
                if (error) console.log(error);
            })
        }
        props.sb.disconnect(() => {
            console.log("You are disconnected from SendBird.");
        })
    }
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand>react.chat</NavbarBrand>
            <Nav className="ml-auto">
                <NavItem>
                    <NavLink className="navlink" to="/">Chat</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="navlink" to='/channels'>Channels</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="navlink" to="/" onClick={logout}>Logout</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
}

const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession,
        channel: state.channel.channel
    }
}


export default connect(mapStateToProps)(Navigation);
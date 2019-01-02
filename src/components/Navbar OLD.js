import React from 'react';
import { connect } from 'react-redux';
import { setUserID } from '../actions';
import {
    Navbar, NavbarBrand, NavItem, Nav,
    NavbarToggler, Collapse
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    logout = () => {
        if (this.props.channel) {
            this.props.channel.exit((response, error) => {
                if (error) console.log(error);
                console.log('Exited channel via logout');
            })
        }
        this.props.sb.disconnect(() => {
            console.log("Disconnected from SendBird via logout.");
        })
        this.props.dispatch(setUserID(''));
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className="navbar-wrapper">
                <Navbar color="light" light expand="md">
                    <NavbarBrand>react.chat</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className="navlink" to={`/chat/${this.props.channelURL}`}>Chat</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="navlink" to='/channels'>Channels</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="navlink" to="/login" onClick={this.logout}>Logout</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession,
        channel: state.channel.channel,
        channelURL: state.channel.channelURL
    }
}

export default connect(mapStateToProps)(Navigation);
import React from 'react';
import { connect } from 'react-redux';
import { setUserID } from '../actions';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
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

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            react.chat
                        </Typography>
                        <Button color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
            /* <div className="navbar-wrapper">
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
             </div>*/
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

export default connect(mapStateToProps)(withStyles(styles)(Navigation));
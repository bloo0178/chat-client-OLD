import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { logout } from '../api/sb_api';

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
            anchorEl: null,
        }
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            react.chat
                        </Typography>
                        <IconButton className={classes.menuButton} color="inherit" >
                            <MenuIcon
                                onClick={this.handleClick} />
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}>
                                <MenuItem
                                    onClick={this.handleClose}
                                    component={Link}
                                    to={`/chat/${this.props.channelURL}`}>
                                    Chat
                                </MenuItem>
                                <MenuItem
                                    onClick={this.handleClose}
                                    component={Link}
                                    to={"/channels"}>
                                    Channels
                                </MenuItem>
                                <MenuItem
                                    onClick={logout}
                                    component={Link}
                                    to={"/login"}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        channelURL: state.channel.channel.url,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Navigation));
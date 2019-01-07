import React from 'react';
import { connect } from 'react-redux';
import { setUserID } from '../actions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { clearMessages, clearChannelURL, clearOpenChannel, clearSBSess } from '../actions';

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

    logout = async () => {
        this.props.dispatch(clearMessages());
        this.props.dispatch(clearChannelURL());
        this.props.dispatch(clearOpenChannel());
        this.props.sb.removeChannelHandler(`${this.props.userid}${this.props.channel.url}${this.props.sb._connectedAt}`);
        if (this.props.channel) {
            await (() => {
                return new Promise(resolve => {
                    this.props.channel.exit((response, error) => {
                        if (error) console.log(error);
                        console.log('Exited channel via logout');
                        resolve();
                    })
                })
            })();
        }
        await (() => {
            return new Promise(resolve => {
                this.props.sb.disconnect(() => {
                    console.log('Disconnected from SendBird via logout.');
                    resolve();
                })
            })
        })();
        this.props.dispatch(setUserID(''));
        //this.props.dispatch(clearSBSess()); !!! DELETE THIS THROUGHOUT APP
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
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon
                                aria-owns={anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleClick} />
                            <Menu
                                id="simple-menu"
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
                                    onClick={this.logout}
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
    }
}

const mapStateToProps = state => {
    return {
        userid: state.userinfo.userid,
        sb: state.sbsession.sbsession,
        channel: state.channel.openChannel,
        channelURL: state.channel.channelURL
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Navigation));
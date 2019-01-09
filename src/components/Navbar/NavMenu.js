import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { logout } from '../../api/sb_api';
import AlertDialog from './AlertDialog';

class NavMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            showAlert: false,
        };
    };

    handleOpen = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    toggleAlert = () => {
        this.setState({
            showAlert: !this.state.showAlert,
        });
    };

    handleToChat = () => {
        if (!this.props.channelURL) {
            this.handleClose();
            this.toggleAlert();
        } else {
            this.handleClose();
            this.props.history.push(`/chat/${this.props.channelURL}`);
        };
    };

    render() {
        return (
            <div>
                <IconButton color="inherit" >
                    <MenuIcon
                        onClick={this.handleOpen} />
                    <Menu
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}>
                        <MenuItem
                            onClick={this.handleToChat}
                        >
                            Chat
                        </ MenuItem>
                        <MenuItem
                            onClick={this.handleClose}
                            component={Link}
                            to={"/channels"}
                        >
                            Channels
                        </ MenuItem>
                        <MenuItem
                            onClick={logout}
                            component={Link}
                            to={"/login"}
                        >
                            Logout
                        </ MenuItem>
                    </Menu>
                </IconButton>
                <AlertDialog
                    showAlert={this.state.showAlert}
                    toggleAlert={this.toggleAlert}
                />
            </div>
        )
    };

};

const mapStateToProps = state => {
    return {
        channelURL: state.channel.channel.url,
    };
};

export default connect(mapStateToProps)(NavMenu);
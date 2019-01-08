import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Participants from './Participants';
import { exitChannel, deleteChannel } from '../../api/sb_api';

class OptionsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            toggleParticipants: false,
        };
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLeave = () => {
        exitChannel();
        this.props.history.push('/channels');
    };

    handleDelete = async () => {
        await deleteChannel();
        this.props.sendAlert(`Channel ${this.props.channel.name} deleted.`);
        this.props.history.push("/channels"); 
    }

    toggleParticipants = () => {
        this.setState({
            toggleParticipants: !this.state.toggleParticipants,
        });
        this.handleClose();
    };

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div>
                <IconButton
                    onClick={this.handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.toggleParticipants}>
                        View Participants
                    </MenuItem>
                    <MenuItem onClick={this.handleLeave}>
                        Leave Channel
                    </MenuItem>
                    <MenuItem onClick={this.handleDelete}>
                        Delete Channel
                    </MenuItem>
                </Menu>
                <Participants
                    open={this.state.toggleParticipants}
                    toggle={this.toggleParticipants} />
            </div>
        );
    };
};



export default OptionsMenu;
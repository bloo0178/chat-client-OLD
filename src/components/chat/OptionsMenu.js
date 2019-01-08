import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import Participants from './Participants';
import { exitChannel, deleteChannel } from '../../api/sendbirdAPI';

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
        let channelHandlerID = `${this.props.userid}${this.props.channel.url}${this.props.sb._connectedAt}`;
        exitChannel(this.props.channel, channelHandlerID, this.props.sb);
        this.props.history.push('/channels');
    };

    handleDelete = async () => {
        let channelHandlerID = `${this.props.userid}${this.props.channel.url}${this.props.sb._connectedAt}`;
        await deleteChannel(this.props.sb, channelHandlerID, this.props.channelURL); // don't need a separate object for channelURL. Get it from channel.url.
        this.props.sendAlert(`Channel deleted.`);
        // this.props.sendAlert(`Channel ${channel.name} deleted.`); // add back in channel name to alert
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

const mapStateToProps = state => {
    return {
        channel: state.channel.openChannel,
        userid: state.userinfo.userid,
        sb: state.sbsession.sbsession,
        channelURL: state.channel.channelURL
    };
};

export default connect(mapStateToProps)(OptionsMenu);
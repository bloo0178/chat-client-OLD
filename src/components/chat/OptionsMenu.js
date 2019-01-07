import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import { clearMessages, clearChannelURL, clearOpenChannel } from '../../actions';
import Participants from './Participants';

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
        this.props.dispatch(clearMessages());
        this.props.dispatch(clearChannelURL());
        this.props.dispatch(clearOpenChannel());
        this.props.sb.removeChannelHandler(`${this.props.userid}${this.props.channel.url}${this.props.sb._connectedAt}`);
        this.props.channel.exit((response, error) => {
            if (error) return alert(error);
        });
        this.props.history.push('/channels');
    };

    handleDelete = () => {
        this.props.dispatch(clearMessages());
        this.props.dispatch(clearOpenChannel()); // Not sure this is needed. May refactor without.
        this.props.sb.removeChannelHandler(`${this.props.userid}${this.props.channel.url}${this.props.sb._connectedAt}`);
        this.props.sb.OpenChannel.getChannel(this.props.channelURL, (channel, error) => {
            if (error) {
                return console.log(error);
            };
            channel.delete((response, error) => {
                if (error) {
                    console.log(error);
                    return alert('You are not an admin of the channel you are trying to delete.');
                }
                console.log(channel);
                this.props.history.push("/channels");
                this.props.sendAlert(`Channel ${channel.name} deleted.`); 
                this.props.dispatch(clearChannelURL());
            });
        });
    };

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
                <Participants channel={this.props.channel} open={this.state.toggleParticipants} toggle={this.toggleParticipants}/>
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
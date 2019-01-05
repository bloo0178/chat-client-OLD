import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import { clearMessages, clearChannelURL, clearOpenChannel } from '../../actions';

class OptionsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
    }

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
        this.props.channel.exit((response, error) => {
            if (error) return alert(error);
            console.log('exited channel');
        })
        this.props.history.push('/channels');
    }

    handleDelete = () => {
        this.props.dispatch(clearMessages());
        this.props.dispatch(clearOpenChannel()); // Not sure this is needed. May refactor without.
        this.props.sb.OpenChannel.getChannel(this.props.channelURL, (channel, error) => {
            if (error) {
                return console.log(error);
            }
            channel.delete((response, error) => {
                if (error) {
                    console.log(error);
                    return alert('You are not an admin of the channel you are trying to delete.');
                }
                alert("Channel deleted.");      
                this.props.history.push("/channels");
                this.props.dispatch(clearChannelURL());
            })
        })
    }

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'options-menu' : undefined}
                    aria-haspopup="true"
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
                    <MenuItem onClick={this.handleClose}>
                        View Participants
                    </MenuItem>
                    <MenuItem onClick={this.handleLeave}>
                        Leave Channel
                    </MenuItem>
                    <MenuItem onClick={this.handleDelete}>
                        Delete Channel
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        channel: state.channel.openChannel,
        sb: state.sbsession.sbsession,
        channelURL: state.channel.channelURL
    }
}

export default connect(mapStateToProps)(OptionsMenu);
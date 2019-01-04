import React from 'react';
import { connect } from 'react-redux';
import { clearMessages, clearChannelURL, clearOpenChannel } from '../../actions';
import Button from '@material-ui/core/Button';

class DeleteChannel extends React.Component {
    constructor(props) {
        super(props)
    }

    // Add an alert dialog to confirm delete. 
    // Only show button if the user is an operator of the channel. 
    handleClick = () => {
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
        return (
            <Button variant="contained" color="secondary" onClick={this.handleClick}>Delete Chat</Button>
        )
    }
}

const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession,
        channelURL: state.channel.channelURL
    }
}

export default connect(mapStateToProps)(DeleteChannel);
import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

class DeleteChannel extends React.Component {
    constructor(props) {
        super(props)
    }

    // Add an alert dialog to confirm delete. 
    // Only show button if the user is an operator of the channel. 
    handleClick = () => {
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
                })
            })
        }

    render() {
        return (
            <Button size="sm" color="danger" onClick={this.handleClick}>Delete Chat</Button>
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
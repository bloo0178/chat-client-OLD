import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

class DeleteChannel extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick = () => {
            this.props.sb.OpenChannel.getChannel(this.props.selectedChannel, (channel, error) => {
                if (error) { 
                    return console.log(error);     
                 }
                channel.delete((response, error) => {
                    if (error) { 
                        console.log(error); 
                        return alert('You are not an admin of the channel you are trying to delete.');
                    }
                    alert("Channel deleted.");
                    this.props.refreshChannels();
                })
            })
        }

    render() {
        return (
            <Button size="sm" onClick={this.handleClick}>Delete</Button>
        )
    }
}

const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession
    }
}

export default connect(mapStateToProps)(DeleteChannel);
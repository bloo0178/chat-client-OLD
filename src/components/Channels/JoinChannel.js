import React from 'react';
import { Button } from 'reactstrap';
import { clearMessages, setChannelURL } from '../../actions'
import { connect } from 'react-redux';

// This component redirects the user to the chat URL. The parameters 
// passed through to that URL are referenced within the Chat component 
// to use the getChannel/ enter functions provided by SendBird. 
class JoinChannel extends React.Component {
    constructor(props) {
        super(props) 
    }

    handleClick = () => {
        if (!this.props.selectedChannel) {
            return;
        }
        this.props.dispatch(clearMessages());
        this.props.dispatch(setChannelURL(this.props.selectedChannel));
        this.props.history.push(`/chat/${this.props.selectedChannel}`);
    }

    render() {
        return (
            <div>
                <Button size="sm" onClick={this.handleClick}>JOIN</Button>
            </div>
        )
    }
}

export default connect()(JoinChannel); 
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { clearMessages, clearChannelURL, clearOpenChannel } from '../../actions';

class LeaveChat extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick = () => {
        this.props.dispatch(clearMessages());
        this.props.dispatch(clearChannelURL());
        this.props.dispatch(clearOpenChannel());
        this.props.channel.exit((response, error) => {
            if (error) return alert(error);
            console.log('exited channel');
        })   
        this.props.history.push('/channels');
    }

    render() {
        return (
            <Button size="sm" onClick={this.handleClick}>Leave Chat</Button>
        )
    }
}

const mapStateToProps = state => {
    return {
        channel: state.channel.openChannel
    }
}

export default connect(mapStateToProps)(LeaveChat)
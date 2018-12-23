import React from 'react';
import { connect } from 'react-redux';

class CreateChannel extends React.Component {
    constructor(props) {
        super(props)
    }

    // Will need to change this to take an input to replace 'TEST_CHANNEL'
    handleClick = () => {
        this.props.sb.OpenChannel.createChannel('TEST_CHANNEL', null, null, null, (channel, error) => {
            if (error) {
                return;
            }
            console.log('channel created');
            console.log(channel);
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Create a Channel</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession
    }
}

export default connect(mapStateToProps)(CreateChannel);
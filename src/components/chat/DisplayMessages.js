import React from 'react';
import { connect } from 'react-redux';

const DisplayMessages = (props) => {

    // May make sense to move the messages listener here. 
    // No other component needs to know about messages.
    //var sb = props.sb;
    //var ChannelHandler = new sb.ChannelHandler();
    //sb.addChannelHandler("UNIQUEID23456", ChannelHandler);

    return (
        <div>
            <ul>
                {props.messages.map((message, index) => {
                    return <li key={index}>{message}</li>
                })}
            </ul>
        </div>
    )
}

// Defined in the Reducer
const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession
    }
}

export default connect(mapStateToProps)(DisplayMessages);
//export default Display;
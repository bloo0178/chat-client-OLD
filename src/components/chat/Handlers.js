import { connect } from 'react-redux';
import { addMessage } from '../../actions/index';

const Handlers = props => {
    /* ------ EVENT HANDLERS ------
    https://docs.sendbird.com/javascript/event_handler#3_channel_handler
    Need to change the UNIQUE_ID for the addChannelHandler. UserID + channelID + someNumber*/
    var ChannelHandler = new props.sb.ChannelHandler();
    props.sb.addChannelHandler(`${props.userid}${props.channel}`, ChannelHandler);
    //this.setState({ channelHandler: ChannelHandler }) // dont think we need this... ?

    ChannelHandler.onUserEntered = (openChannel, user) => {
        console.log('user entered');
        props.updateParticipantList(props.channel);
    }

    ChannelHandler.onUserExited = (openChannel, user) => {
        console.log('user exited');
        props.updateParticipantList(props.channel)
    }

    ChannelHandler.onMessageReceived = (channel, message) => {
        props.dispatch(addMessage(`${message._sender.userId}: ${message.message}`))
    }

    return null;
}

const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession,
        userid: state.userinfo.userid,
        channel: state.channel.openChannel, //currently only accepts openChannels
        messages: state.messages
    }
}

export default connect(mapStateToProps)(Handlers);
import { connect } from 'react-redux';
import { addMessage } from '../../actions/index';

const Handlers = props => {
    /* ------ EVENT HANDLERS ------
    https://docs.sendbird.com/javascript/event_handler#3_channel_handler */
    var ChannelHandler = new props.sb.ChannelHandler();
    props.sb.addChannelHandler(`${props.userid}${props.channel.name}${props.sb._connectedAt}`, ChannelHandler);

    ChannelHandler.onUserEntered = (openChannel, user) => {
        props.updateParticipantList();
        props.dispatch(addMessage('info', `${user.userId} has joined.`))
    };

    ChannelHandler.onUserExited = (openChannel, user) => {
        props.updateParticipantList();
        props.dispatch(addMessage('info', `${user.userId} has left.`))
    };

    ChannelHandler.onMessageReceived = (channel, message) => {
        props.dispatch(addMessage(message._sender.userId, message.message));
    };

    return null;
};

const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession,
        userid: state.userinfo.userid,
        channel: state.channel.openChannel, //currently only accepts openChannels
        messages: state.messages
    }
};

export default connect(mapStateToProps)(Handlers);
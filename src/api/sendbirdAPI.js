import {
    clearMessages, clearChannelURL, setOpenChannel,
    clearOpenChannel, setUserID, clearSBSess, setSBSess,
    updateParticipants, addMessage
} from '../actions';
import { store } from '../index';

//var sb = store.getState().sbsession.sbsession;

const exitChannel = (channel, channelHandlerID, sb) => { // just add literal access to sb here. don't need a param.
    return new Promise(resolve => {
        store.dispatch(clearMessages());
        store.dispatch(clearChannelURL());
        store.dispatch(clearOpenChannel());
        sb.removeChannelHandler(channelHandlerID); // might make sense to store channelHandlerID in redux store (add/ clear)
        channel.exit((response, error) => {
            if (error) console.log(error);
            console.log('Exited channel.');
            resolve();
        });
    });
};

const disconnectSession = (sb) => { // just add literal access to sb here. don't need a param.
    return new Promise(resolve => {
        sb.disconnect(() => {
            console.log('Disconnected from SendBird via logout.');
            resolve();
        });
    });
};

const logout = async (channelHandlerID, channel, sb) => { //may want to store channelHandlerID in redux store; // just add literal access to sb here. don't need a param.
    if (channel) { await exitChannel(channel, channelHandlerID, sb); };
    await disconnectSession(sb);
    store.dispatch(setUserID(''));
    //this.props.dispatch(clearSBSess()); !!! DELETE THIS THROUGHOUT APP
};

const deleteChannel = (sb, channelHandlerID, channelURL) => { // just add literal access to sb here. don't need a param.
    return new Promise(resolve => {
        store.dispatch(clearMessages());
        store.dispatch(clearOpenChannel()); // Not sure this is needed. May refactor without.
        sb.removeChannelHandler(channelHandlerID);
        sb.OpenChannel.getChannel(channelURL, (channel, error) => {
            if (error) return console.log(error);
            channel.delete((response, error) => {
                if (error) {
                    console.log(error);
                    return alert('You are not an admin of the channel you are trying to delete.');
                }
                store.dispatch(clearChannelURL());
                resolve();
            });
        });
    });
};

const initializeSBSession = (SB_APP_ID) => { // REDO this function. Remove the function logic from the reducer to here.
    return new Promise(resolve => {
        store.dispatch(setSBSess(SB_APP_ID));
        resolve(store.sb);
    });
};

const connectUser = (username, sb) => { // just add literal access to sb here. don't need a param.
    return new Promise(resolve => {
        sb.connect(username, (user, error) => {
            if (error) return console.log(error);
            store.dispatch(setUserID(username));
            resolve(user);
        });
    });
};

const enterChannel = (sb, channelURL) => { // just add literal access to sb here. don't need a param.
    return new Promise(resolve => {
        console.dir(store.getState().sbsession.sbsession);
        let sb = store.getState().sbsession.sbsession; // THIS WORKS. REPLACE THIS ELSEWHERE SO ITS NOT MANUALLY ADDED THROUGHOUT THE APP.
        sb.OpenChannel.getChannel(channelURL, (channel, error) => {
            if (error) return console.log(error);
            channel.enter((response, error) => {
                if (error) return console.log(error);
                // Possibly refactor. setOpenChannel might not need to be in the Redux store.
                store.dispatch(setOpenChannel(channel));
                resolve();
            });
        });
    });
};

const getParticipantList = (channel) => {
    let list = [];
    let participantListQuery = channel.createParticipantListQuery();
    participantListQuery.next((participantList, error) => {
        if (error) return console.log(error);
        participantList.map((participant) => {
            list.push(participant.userId);
        });
    });
    return list;
}

// ------ EVENT HANDLERS ------
// https://docs.sendbird.com/javascript/event_handler#3_channel_handler 
const addChannelHandler = (sb, channelHandlerID, channel) => { // just add literal access to sb here. don't need a param.
    let ChannelHandler = new sb.ChannelHandler();

    ChannelHandler.onUserEntered = (openChannel, user) => {
        let participantList = getParticipantList(channel);
        store.dispatch(updateParticipants(participantList));
        store.dispatch(addMessage('info', `${user.userId} has joined.`));
    };

    ChannelHandler.onUserExited = (openChannel, user) => {
        let participantList = getParticipantList(channel);
        store.dispatch(updateParticipants(participantList));
        store.dispatch(addMessage('info', `${user.userId} has left.`));
        console.log(`${user.userId} has left.`);
    };

    ChannelHandler.onMessageReceived = (channel, message) => {
        store.dispatch(addMessage(message._sender.userId, message.message));
    };

    // Add channel event handler to the SendBird object.
    sb.addChannelHandler(channelHandlerID, ChannelHandler);
};

export {
    logout, exitChannel, deleteChannel,
    initializeSBSession, connectUser, enterChannel,
    addChannelHandler,
};
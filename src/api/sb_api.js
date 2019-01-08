import {
    clearMessages, 
    setUserID, setSBSess,
    updateParticipants, addMessage,
    setChannel, clearChannel, setChannelHandlerID
} from '../actions/actions';
import { store } from '../index';
import * as SendBird from 'sendbird';


var sb = new SendBird({ 'appId': process.env.REACT_APP_SB_APP_ID });


export const login = (username) => {
    store.dispatch(setSBSess(sb));
    return new Promise(resolve => {
        sb.connect(username, (user, error) => {
            if (error) return console.log(error);
            store.dispatch(setUserID(username));
            resolve(user);
        });
    });
};

export const logout = async () => {
    let channel = store.getState().channel.channel;

    const disconnectSession = () => {
        return new Promise(resolve => {
            sb.disconnect(() => {
                resolve();
            });
        });
    };

    if (channel) { await exitChannel(); };
    await disconnectSession();
    store.dispatch(setUserID(''));
};


export const enterChannel = (channelURL) => { 
    return new Promise(resolve => {
        sb.OpenChannel.getChannel(channelURL, (channel, error) => {
            if (error) return console.log(error);
            channel.enter((response, error) => {
                console.log(channel);
                if (error) return console.log(error);
                store.dispatch(clearMessages());
                store.dispatch(setChannel(channel));
                resolve();
            });
        });
    });
};


export const exitChannel = () => {
    let channel = store.getState().channel.channel;
    let channelHandlerID = store.getState().channel.channelHandlerID;
    return new Promise(resolve => {
        store.dispatch(clearMessages());
        store.dispatch(clearChannel());
        sb.removeChannelHandler(channelHandlerID);
        channel.exit((response, error) => {
            if (error) console.log(error);
            resolve();
        });
    });
};


export const createChannel = (channelName) => {
    let userID = store.getState().sbsession.sbsession.currentUser.userId;
    return new Promise(resolve => {
        // Array adds the operatorID's to the channel to provide admin priv.
        sb.OpenChannel.createChannel(channelName, null, null,
            ['admin', userID], (channel, error) => {
                if (error) return console.log(error);
                resolve(channel.url);
            });
    });
};


export const deleteChannel = () => {
    let channelHandlerID = store.getState().channel.channelHandlerID;
    let channelURL = store.getState().channel.channel.url;
    return new Promise(resolve => {
        store.dispatch(clearMessages());
        sb.removeChannelHandler(channelHandlerID);
        sb.OpenChannel.getChannel(channelURL, (channel, error) => {
            if (error) return console.log(error);
            channel.delete((response, error) => {
                if (error) {
                    console.log(error);
                    return alert('You are not an admin of the channel you are trying to delete.');
                }
                store.dispatch(clearChannel());
                resolve();
            });
        });
    });
};


// ------ EVENT HANDLERS ------
// https://docs.sendbird.com/javascript/event_handler#3_channel_handler 
export const addChannelHandler = () => {
    let ChannelHandler = new sb.ChannelHandler();
    let userid = store.getState().userinfo.userid;
    let channelURL = store.getState().channel.channel.url;
    let connectedAt = store.getState().sbsession.sbsession._connectedAt;
    let channelHandlerID = `${userid}${channelURL}${connectedAt}`;
    let channel = store.getState().channel.channel;

    const getParticipantList = () => {
        let list = [];
        // Below is periodically causing issues. 
        // "channel.createParticipantListQuery is not a function." 
        let participantListQuery = channel.createParticipantListQuery();
        participantListQuery.next((participantList, error) => {
            if (error) return console.log(error);
            participantList.map((participant) => {
                return list.push(participant.userId);
            });
        });
        return list;
    };

    store.dispatch(setChannelHandlerID(channelHandlerID));

    ChannelHandler.onUserEntered = (openChannel, user) => {
        let participantList = getParticipantList();
        store.dispatch(updateParticipants(participantList));
        store.dispatch(addMessage('info', `${user.userId} has joined.`));
    };
    ChannelHandler.onUserExited = (openChannel, user) => {
        let participantList = getParticipantList();
        store.dispatch(updateParticipants(participantList));
        store.dispatch(addMessage('info', `${user.userId} has left.`));
    };
    ChannelHandler.onMessageReceived = (channel, message) => {
        store.dispatch(addMessage(message._sender.userId, message.message));
    };
    // Add channel event handler to the SendBird object.
    sb.addChannelHandler(channelHandlerID, ChannelHandler);
};


export const getChannelList = async () => {
    return new Promise(resolve => {
        let channelList;
        let openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();
        openChannelListQuery.next((channels, error) => {
            if (error) return console.log(error);
            channelList = channels;
            resolve(channelList);
        })
    });
};


export const sendMessage = (message) => {
    let channel = store.getState().channel.channel;
    channel.sendUserMessage(message, (message, error) => {
        if (error) return console.log(error);
    });
    store.dispatch(addMessage('You', message));
};


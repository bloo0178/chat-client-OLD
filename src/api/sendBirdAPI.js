import {
  clearMessages,
  setUserID,
  setSBSess,
  updateParticipants,
  addMessage,
  setChannel,
  clearChannel,
  setChannelHandlerID
} from "../redux/actions/actions";
import { store } from "../index";
import * as SendBird from "sendbird";

const sb = new SendBird({ appId: process.env.REACT_APP_SB_APP_ID });

export const login = username => {
  store.dispatch(setSBSess(sb));
  return new Promise(resolve => {
    sb.connect(
      username,
      (user, error) => {
        if (error) return console.log(error);
        store.dispatch(setUserID(username));
        resolve(user);
      }
    );
  });
};

export const logout = async () => {
  const channel = store.getState().channel.channel;
  const disconnectSession = () => {
    return new Promise(resolve => {
      sb.disconnect(() => {
        resolve();
      });
    });
  };
  if (channel) {
    await exitChannel();
  }
  await disconnectSession();
  store.dispatch(setUserID(""));
};

export const enterChannel = channelURL => {
  const oldChannel = store.getState().channel.channel;
  return new Promise(async resolve => {
    if (oldChannel) await exitChannel();
    sb.OpenChannel.getChannel(channelURL, (channel, error) => {
      if (error) return console.log(error);
      channel.enter((response, error) => {
        if (error) return console.log(error);
        store.dispatch(clearMessages());
        store.dispatch(setChannel(channel));
        resolve();
      });
    });
  });
};

export const exitChannel = () => {
  const channel = store.getState().channel.channel;
  const channelHandlerID = store.getState().channel.channelHandlerID;
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

export const createChannel = channelName => {
  const userID = store.getState().sbsession.sbsession.currentUser.userId;
  return new Promise(resolve => {
    // Array adds the operatorID's to the channel to provide admin priv.
    sb.OpenChannel.createChannel(
      channelName,
      null,
      null,
      ["admin", userID],
      (channel, error) => {
        if (error) return console.log(error);
        resolve(channel.url);
      }
    );
  });
};

export const deleteChannel = () => {
  const channelHandlerID = store.getState().channel.channelHandlerID;
  const channelURL = store.getState().channel.channel.url;
  return new Promise(resolve => {
    sb.OpenChannel.getChannel(channelURL, (channel, error) => {
      if (error) return console.log(error);
      channel.delete((response, error) => {
        if (error) {
          console.log(error);
          resolve("error");
        } else {
          store.dispatch(clearChannel());
          store.dispatch(clearMessages());
          sb.removeChannelHandler(channelHandlerID);
          resolve();
        }
      });
    });
  });
};

// ------ EVENT HANDLERS ------
// https://docs.sendbird.com/javascript/event_handler#3_channel_handler
export const addChannelHandler = () => {
  const ChannelHandler = new sb.ChannelHandler();
  const userid = store.getState().userinfo.userid;
  const channelURL = store.getState().channel.channel.url;
  const connectedAt = store.getState().sbsession.sbsession._connectedAt;
  const channelHandlerID = `${userid}${channelURL}${connectedAt}`;
  const channel = store.getState().channel.channel;

  const getParticipantList = () => {
    let list = [];
    // Below is periodically causing issues.
    // "channel.createParticipantListQuery is not a function."
    const participantListQuery = channel.createParticipantListQuery();
    participantListQuery.next((participantList, error) => {
      if (error) return console.log(error);
      participantList.map(participant => {
        return list.push(participant.userId);
      });
    });
    return list;
  };

  store.dispatch(setChannelHandlerID(channelHandlerID));

  ChannelHandler.onUserEntered = (openChannel, user) => {
    const participantList = getParticipantList();
    store.dispatch(updateParticipants(participantList));
    store.dispatch(addMessage("info", `${user.userId} has joined.`));
  };
  ChannelHandler.onUserExited = (openChannel, user) => {
    const participantList = getParticipantList();
    store.dispatch(updateParticipants(participantList));
    store.dispatch(addMessage("info", `${user.userId} has left.`));
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
    const openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();
    openChannelListQuery.next((channels, error) => {
      if (error) return console.log(error);
      channelList = channels;
      resolve(channelList);
    });
  });
};

export const sendMessage = message => {
  const channel = store.getState().channel.channel;
  channel.sendUserMessage(message, (message, error) => {
    if (error) return console.log(error);
  });
  store.dispatch(addMessage("You", message));
};

export const isOperator = () => {
  const channel = store.getState().channel.channel;
  const result = channel.isOperatorWithUserId(sb.getCurrentUserId());
  return result;
};

import {
  clearMessages,
  addMessage,
  setChannel,
  clearChannel
} from "../modules/actions/actions";
import { store } from "../index";
import * as SendBird from "sendbird";

const sb = new SendBird({ appId: process.env.REACT_APP_SB_APP_ID });

export const enterChannel = channelURL => {
  console.log(sb);
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

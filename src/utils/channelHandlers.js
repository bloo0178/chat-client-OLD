import {
  updateParticipants,
  addMessage,
  setChannelHandlerID
} from "../modules/actions/actions";
import { store } from "../index";
import * as SendBird from "sendbird";

const sb = new SendBird({ appId: process.env.REACT_APP_SB_APP_ID });

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

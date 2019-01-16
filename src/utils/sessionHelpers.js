import {
  setUserID,
  setSBSess,
} from "../modules/actions/actions";
import { store } from "../index";
import * as SendBird from "sendbird";
import { exitChannel } from './channelHelpers';

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

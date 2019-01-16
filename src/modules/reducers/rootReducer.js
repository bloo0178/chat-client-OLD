import { combineReducers } from "redux";
import sbsession from './sbsession';
import channel from './channel';
import userinfo from './userinfo';
import messages from './messages';
import participants from './participants';
import channels from './channels';

const rootReducer = combineReducers({
  userinfo: userinfo,
  sbsession: sbsession,
  channel: channel,
  messages: messages,
  participants: participants,
  channels: channels
});

export default rootReducer;

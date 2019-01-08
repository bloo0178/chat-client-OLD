import { combineReducers } from 'redux';

const userinfoInitState = { userid: '' };

const userinfo = (state = userinfoInitState, action) => {
    switch (action.type) {
        case 'SET_USERID':
            return Object.assign({}, state, {
                userid: action.userid
            });
        default:
            return state
    }
};

const sbsessionInitState = { sbsession: '' }

const sbsession = (state = sbsessionInitState, action) => {
    switch (action.type) {
        case 'SET_SBSESS':
            return Object.assign({}, state, {
                sbsession: action.sb
            })
        default:
            return state
    }
};

const channelInitState = { channelHandlerID: '', channel: '' }

const channel = (state = channelInitState, action) => {
    switch (action.type) {
        case 'SET_CHANNEL_HANDLER_ID': 
            return Object.assign({}, state, {
                channelHandlerID: action.channelHandlerID
            });
        case 'SET_CHANNEL': 
            return Object.assign({}, state, {
                channel: action.channel
            });
        case 'CLEAR_CHANNEL': 
            return Object.assign({}, state, {
                channel: ''
            });
        default:
            return state;
    }
};

// Messages are kept in Redux store to allow them to persist and
// reload despite the user potentially navigating to different screens
// and unmounting the Chat component.
const messages = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return [
                ...state,
                {
                    sender: action.sender,
                    message: action.message
                }
            ]
        case 'CLEAR_MESSAGES':
            return [];
        default:
            return state;
    }
};

const participants = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_PARTICIPANTS':
            return action.participants;
        default:
            return state;
    }
};

const channels = (state = [], action) => {
    switch (action.type) {
        case 'REFRESH_CHANNELS':
            return action.channels;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    userinfo: userinfo,
    sbsession: sbsession,
    channel: channel,
    messages: messages,
    participants: participants,
    channels: channels
});

export default rootReducer;




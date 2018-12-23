import { combineReducers } from 'redux';
import * as SendBird from 'sendbird';

//https://redux.js.org/basics/reducers

const userinfo = (state = '', action) => {
    switch (action.type) {
        case 'SET_USERID':
            return Object.assign({}, state, {
                userid: action.userid
            })
        default:
            return state
    }
}

const sbsession = (state = '', action) => {
    switch (action.type) {
        case 'SET_SBSESS':
            return Object.assign({}, state, {
                sbsession: new SendBird({ 'appId': action.appid })
            })
        default:
            return state
    }
}

const channel = (state = '', action) => {
    switch (action.type) {
        case 'SET_OPEN_CHANNEL':
            return Object.assign({}, state, {
                openChannel: action.openChannel
            });
        case 'EXIT_OPEN_CHANNEL':
            return {};
        default:
            return state
    }
}

// Messages are kept in Redux store to allow them to persist and
// re-load despite the user potentially navigating to different screens
// and unmounting the Chat component.
const messages = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return [
                ...state,
                {
                    message: action.message
                }
            ]
        case 'CLEAR_MESSAGES': 
            return [];
        default:
            return state
    }
}

const rootReducer = combineReducers({
    userinfo: userinfo,
    sbsession: sbsession,
    channel: channel,
    messages: messages
})

export default rootReducer;




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
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    userinfo: userinfo,
    sbsession: sbsession,
    channel: channel
})

export default rootReducer;




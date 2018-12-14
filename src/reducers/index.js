import { combineReducers } from 'redux';
import * as SendBird from 'sendbird';

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

const rootReducer = combineReducers({
    userinfo: userinfo,
    sbsession: sbsession
})

export default rootReducer;




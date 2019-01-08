export const setUserID = userid => ({
    type: 'SET_USERID',
    userid
})

export const setSBSess = sb => ({
    type: 'SET_SBSESS',
    sb
})

// sender will be either 'You', [other senderID], or 'info'
export const addMessage = (sender,message) => ({
    type: 'ADD_MESSAGE',
    sender, 
    message
})

export const clearMessages = () => ({
    type: 'CLEAR_MESSAGES'
})

export const updateParticipants = participants => ({
    type: 'UPDATE_PARTICIPANTS',
    participants
})

export const refreshChannels = channels => ({
    type: 'REFRESH_CHANNELS',
    channels
})

export const setChannelHandlerID = channelHandlerID => ({
    type: 'SET_CHANNEL_HANDLER_ID',
    channelHandlerID
})

export const setChannel = channel => ({
    type: 'SET_CHANNEL', 
    channel
})

export const clearChannel = channel => ({
    type: 'CLEAR_CHANNEL', 
    channel
})
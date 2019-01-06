export const setUserID = userid => ({
    type: 'SET_USERID',
    userid
})

export const setSBSess = appid => ({
    type: 'SET_SBSESS',
    appid
})

export const setOpenChannel = openChannel => ({
    type: 'SET_OPEN_CHANNEL', 
    openChannel
})

export const clearOpenChannel = () => ({
    type: 'EXIT_OPEN_CHANNEL'
})

export const setChannelURL = channelURL => ({
    type: 'SET_CHANNEL_URL',
    channelURL
})

export const clearChannelURL = () => ({
    type: 'CLEAR_CHANNEL_URL'
})

export const addMessage = (sender,message) => ({
    type: 'ADD_MESSAGE',
    sender, // will be either 'You', [other senderID], or 'info'
    message
})

export const clearMessages = () => ({
    type: 'CLEAR_MESSAGES'
})
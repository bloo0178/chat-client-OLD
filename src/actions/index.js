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

export const addMessage = message => ({
    type: 'ADD_MESSAGE',
    message
})
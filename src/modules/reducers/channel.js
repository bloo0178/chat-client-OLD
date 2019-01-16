const channelInitState = { channelHandlerID: "", channel: "" };

const channel = (state = channelInitState, action) => {
  switch (action.type) {
    case "SET_CHANNEL_HANDLER_ID":
      return Object.assign({}, state, {
        channelHandlerID: action.channelHandlerID
      });
    case "SET_CHANNEL":
      return Object.assign({}, state, {
        channel: action.channel
      });
    case "CLEAR_CHANNEL":
      return Object.assign({}, state, {
        channel: ""
      });
    default:
      return state;
  }
};

export default channel;
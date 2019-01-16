const channels = (state = [], action) => {
  switch (action.type) {
    case "REFRESH_CHANNELS":
      return action.channels;
    default:
      return state;
  }
};

export default channels;

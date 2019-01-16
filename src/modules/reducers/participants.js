const participants = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_PARTICIPANTS":
      return action.participants;
    default:
      return state;
  }
};

export default participants;

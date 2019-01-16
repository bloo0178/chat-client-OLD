// Messages are kept in Redux store to allow them to persist and
// reload despite the user potentially navigating to different screens
// and unmounting the Chat component.
const messages = (state = [], action) => {
    switch (action.type) {
      case "ADD_MESSAGE":
        return [
          ...state,
          {
            sender: action.sender,
            message: action.message
          }
        ];
      case "CLEAR_MESSAGES":
        return [];
      default:
        return state;
    }
  };

export default messages;
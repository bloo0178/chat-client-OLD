const sbsessionInitState = { sbsession: "" };

const sbsession = (state = sbsessionInitState, action) => {
  switch (action.type) {
    case "SET_SBSESS":
      return Object.assign({}, state, {
        sbsession: action.sb
      });
    default:
      return state;
  }
};

export default sbsession;
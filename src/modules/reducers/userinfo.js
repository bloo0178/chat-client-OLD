const userinfoInitState = { userid: "" };

const userinfo = (state = userinfoInitState, action) => {
  switch (action.type) {
    case "SET_USERID":
      return Object.assign({}, state, {
        userid: action.userid
      });
    default:
      return state;
  }
};

export default userinfo;
const reducer = (state = null, action) => {
  switch (action.type) {
    case "TIMEOUT_REGISTER":
      return action.data.timeoutID;
    default:
      return state;
  }
};

export default reducer;

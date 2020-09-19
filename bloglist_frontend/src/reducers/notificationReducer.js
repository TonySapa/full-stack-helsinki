const reducer = (state = null, action) => {
  switch (action.type) {
    case "NOTIF_CLEAR":
      return null;
    case "NOTIF_SET":
      return action.data.notificObject;
    default:
      return state;
  }
};

/**
 * Asynchronous action creator.
 * @param {Object} notificObject class (`"success"` or `"failure"`) and content of the notification
 * @param {Number} time until setting any notification to `null`, i.e. clearing it off, in seconds
 * @returns asynchronous function, which Redux will automatically call with parameters `dispatch` and `getState`
 */
export const notificAction = (notificObject, time) => async (dispatch, getState) => {
  /* Cancel the timeout stored in `state.timeout`, i.e. the timeout for de-rendering
  Notification component. Calling `clearTimeout()` with `null` or `undefined` is OK,
  therefore no checks are needed for that. */
  clearTimeout(getState().timeout);

  // render notification
  dispatch({
    type: "NOTIF_SET",
    data: { notificObject }
  });

  /* Set timeout after which any notification disappears. This happens by setting the
  value of `state.notification` to null, which causes the component not to render. */
  const timeoutID = setTimeout(() => {
    dispatch({
      type: "NOTIF_CLEAR"
    });
  }, time * 1000);

  // save the de-render timeout's ID to store so that it can be canceled if needed
  dispatch({
    type: "TIMEOUT_REGISTER",
    data: { timeoutID }
  });
};

export default reducer;
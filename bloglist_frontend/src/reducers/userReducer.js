import blogService from "../services/blogs";
import loginService from "../services/login";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.data.loggedInUserObject;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

/**
 * Action creator for async action: **set new login, i.e. not already logged in yet**.
 * @param loginInputs object containing fields needed to authenticate a user logging in
 */
export const loginNewAction = (loginInputs) => async (dispatch) => {
  const { data } = await loginService.login(loginInputs);
  blogService.setToken(data.token);
  window.localStorage.setItem("loggedInUser", JSON.stringify(data));
  dispatch({
    type: "LOGIN",
    data: { loggedInUserObject: data }
  });
};

/**
 * Action creator for **setting user who is already logged in to Redux state**.
 * @param {String} loggedInUserString representing a user already logged in, from browser's local storage
 */
export const checkExistingLogin = () => (dispatch, getState) => {
  const loggedInUserString = window.localStorage.getItem("loggedInUser");
  const loggedInUserObject = JSON.parse(loggedInUserString);
  if (!loggedInUserString) return;
  blogService.setToken(loggedInUserObject.token);
  dispatch({
    type: "LOGIN",
    data: { loggedInUserObject }
  });
};

/**
 * Action creator for async action: **log out user**.
 */
export const logoutAction = () => async (dispatch) => {
  window.localStorage.removeItem("loggedInUser");
  blogService.setToken(null);
  dispatch({
    type: "LOGOUT"
  });
};

export default reducer;
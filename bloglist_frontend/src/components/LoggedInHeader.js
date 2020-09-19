import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificAction } from "../reducers/notificationReducer";
import { logoutAction } from "../reducers/userReducer";

const LoggedInHeader = () => {
  const dispatch = useDispatch();
  const loggedInName = useSelector((state) => state.user).name;

  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch(notificAction({ type: "success", message: "logged out" }, 3));
    // TODO: push to landing page?
  };

  return (
    <p>
      {`${loggedInName} logged in.`}

      <button id="logoutButton" type="button" onClick={handleLogout} >
        Log out
      </button>
    </p>
  );
}

export default LoggedInHeader;

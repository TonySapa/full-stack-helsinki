import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { notificAction } from "../reducers/notificationReducer"
import { logoutAction } from "../reducers/userReducer"
import { NavLink } from 'react-router-dom'

const LoggedInHeader = () => {
  const dispatch = useDispatch();
  const loggedInName = useSelector((state) => state.user).name;

  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch(notificAction({ type: "success", message: "logged out" }, 3));
    // TODO: push to landing page?
  };

  return (
    <nav style={{backgroundColor: 'silver'}}>
      <NavLink style={{margin: '10px'}} to='/blogs/'>blogs</NavLink>
      <NavLink style={{margin: '10px'}} to='/users/'>users</NavLink>
      {`${loggedInName} logged in.`}

      <button id="logoutButton" type="button" onClick={handleLogout} >
        Log out
      </button>
    </nav>
  );
}

export default LoggedInHeader;

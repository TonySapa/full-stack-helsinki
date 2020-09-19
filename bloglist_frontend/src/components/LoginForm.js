import React from "react";
import { useDispatch } from "react-redux";
import { notificAction } from "../reducers/notificationReducer";
import { loginNewAction } from "../reducers/userReducer";

const LoginForm = ({
  loginInputs,
  setLoginInputs
}) => {
  const dispatch = useDispatch();
  // helper functions for this component
  const clearInputFields = () => {
    setLoginInputs({ username: "", password: "" });
  };
  const handleLogin = async (event) => {
    event.preventDefault();
      dispatch(loginNewAction(loginInputs))
        .then(
          // successful login
          () => dispatch(notificAction(
            {
              type: "success",
              message: `logged in as "${loginInputs.username}"`
            }, 3
          )),
          // failed login
          (error) => dispatch(notificAction(
            { 
              type: "failure",
              message: `${error.response.data.error} (${error.response.status})`
            }, 3
          ))
        );
      clearInputFields();
  };

  return (
    <div>
      <h2 id="loginHeading">log in to application</h2>
      <form onSubmit={handleLogin} id="loginForm">
        <div>
          username
          <input
            type="username"
            value={loginInputs.username}
            name="Username"
            onChange={({ target }) => setLoginInputs({ ...loginInputs, username: target.value })}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={loginInputs.password}
            name="Password"
            onChange={({ target }) => setLoginInputs({ ...loginInputs, password: target.value })}
          />
        </div>
        <button type="submit" id="loginButton">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

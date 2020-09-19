// Low-priority-TODO: Organize imports.
import React, { useState, useEffect } from "react";
import "./App.css"; // notifications' styles
import CreateBlog from "./components/CreateBlog";
import LoggedInView from "./components/LoggedInView";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser";
import SingleBlog from "./components/SingleBlog";

import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import { useSelector, useDispatch } from "react-redux";
import { blogsInitAction } from "./reducers/blogsReducer";
import { checkExistingLogin } from "./reducers/userReducer";
import { Switch, Route, Redirect } from "react-router-dom";

const App = () => {
  // old state hooks to be replaced with Redux
  const [loginInputs, setLoginInputs] = useState({ username: "", password: "" });

  // new Redux states
  const dispatch = useDispatch(); // state updating tool
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(blogsInitAction());
  }, [dispatch]);

  useEffect(() => {
    // check for existing login
    dispatch(checkExistingLogin());
  }, [dispatch]);

  const toggleRef = React.createRef(); // ref for the Togglable of CreateBlog
  return (
    <div>
      { notification !== null && <Notification notification={notification} /> }

      <Switch>
        <Route path="/users/:id" component={SingleUser} />
        <Route path="/users">
          { window.localStorage.getItem("loggedInUser")
            ? <Users user={user} blogs={blogs} />
            : <Redirect to="/" /> }
        </Route>
        <Route path="/blogs/:id" component={SingleBlog} />
        <Route path="/">
          {user === null
            ? (
              <LoginForm
                loginInputs={loginInputs}
                setLoginInputs={setLoginInputs}
                user={user}
              />
            )
            : (
              <>
                <LoggedInView
                  blogs={blogs}
                  user={user}
                />
                <Togglable
                  toggleLabels={{
                    labelShow: "Submit a new blog",
                    labelHide: "Cancel submission"
                  }}
                  ref={toggleRef}
                >
                  <CreateBlog
                    blogs={blogs}
                    toggleRef={toggleRef}
                    handleNewBlogSubmit={blogService.handleNewBlogSubmit}
                  />
                </Togglable>
              </>
          )}
        </Route>
      </Switch>
    </div>

  );
};

export default App;

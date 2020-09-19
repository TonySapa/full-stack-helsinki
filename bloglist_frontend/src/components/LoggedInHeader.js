import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { notificAction } from "../reducers/notificationReducer"
import { logoutAction } from "../reducers/userReducer"
import { NavLink } from 'react-router-dom'
// Antd design styles
import { Menu } from 'antd';
import { BookOutlined, UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const LoggedInHeader = () => {
  const [current, setCurrent] = useState(window.location.pathname.slice(1))

  const dispatch = useDispatch();
  const loggedInName = useSelector((state) => state.user).name;

  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch(notificAction({ type: "success", message: "logged out" }, 3));
    // TODO: push to landing page?
  };

  return (
    <>
      <Menu selectedKeys={current} mode="horizontal">
        <Menu.Item onClick={() => setCurrent('blog')} key="blog" icon={<BookOutlined />}>
          <NavLink to='/blogs'>Blogs</NavLink>
        </Menu.Item>
        <Menu.Item onClick={() => setCurrent('user')} key="user" icon={<UserOutlined />}>
          <NavLink to='/users'>Users</NavLink>
        </Menu.Item>
      </Menu>
        {`${loggedInName} logged in.`}

        <button id="logoutButton" type="button" onClick={handleLogout} >
          Log out
        </button>
    </>
  );
}

export default LoggedInHeader;

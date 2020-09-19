/* eslint-disable no-alert */
import React from "react"
import { useDispatch } from "react-redux"
import Togglable from "./Togglable"
import { notificAction } from "../reducers/notificationReducer"
import { blogsRemoveAction, blogsVoteAction } from "../reducers/blogsReducer"
import { NavLink } from 'react-router-dom'
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;

/**
 * Blog component consists of its title and a Togglable component
 * which in turn contains the blog details.
 */
const Blog = ({
  blog, loggedInUser
}) => {
  const dispatch = useDispatch();
  const removeClickHandler = async () => {
    if (!window.confirm(`Are you sure you want to remove blog "${blog.title}" by ${blog.author}?`)) return;
    try {
      dispatch(blogsRemoveAction(blog.id));
      dispatch(notificAction({ type: "success", message: `Blog "${blog.title}" removed.` }, 3));
    } catch (error) {
      dispatch(notificAction({ type: "failure", message: `Only allowed for submitter. (${error.response.status} ${error.response.statusText})` }, 3));
    }
  };

  return (
    <>

    {/*<div className='blog'>
      <NavLink to={`/blogs/${blog.id}`} >
        <b style={{ display: "block" }}>{blog.title}</b>
        <i style={{ display: "block" }}>{`by ${blog.author}`}</i>

        <Togglable toggleLabels={{ labelShow: "Show details", labelHide: "Hide details" }}>

          <ul>
            <li>
              {`votes: ${blog.likes}`}
              <button id="voteButton" type="button" onClick={() => dispatch(blogsVoteAction(blog.id))}>vote</button>
            </li>
            {blog.user !== null ? <li>{`submitted by ${blog.user.name}`}</li> : ""}
            <li><a href={blog.url}>link</a></li>
          </ul>

          {// render "remove" button only if submitter is logged in
          (blog.user !== null && loggedInUser.username === blog.user.username)
          && (
          <button className="removeButton" type="button" onClick={removeClickHandler}>
            Remove blog
          </button>
          )
          }

        </Togglable>
      </NavLink>
        </div>*/}
      <NavLink to={`/blogs/${blog.id}`} >
        <Card
          cover={
            <img
              alt="example"
              src={blog.image ? blog.image : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
            />
          }
        >
        </Card>
      </NavLink>
      <Togglable toggleLabels={{ labelShow: "Show details", labelHide: "Hide details" }}>
      <ul>
        <li>
          {`votes: ${blog.likes}`}
          <button id="voteButton" type="button" onClick={() => dispatch(blogsVoteAction(blog.id))}>vote</button>
        </li>
        {blog.user !== null ? <li>{`submitted by ${blog.user.name}`}</li> : ""}
        <li><a href={blog.url}>link</a></li>
      </ul>
      {(blog.user !== null && loggedInUser.username === blog.user.username)
      && 
      (<button className="removeButton" type="button" onClick={removeClickHandler}>
        Remove blog
      </button>)}
    </Togglable>
    </>
  );
};

export default Blog;

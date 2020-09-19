import React, { useState } from "react";
import LoggedInHeader from "../components/LoggedInHeader";
import { useSelector } from "react-redux";
import blogService from '../services/blogs'
import { useDispatch } from "react-redux";
import { blogsVoteAction } from "../reducers/blogsReducer";


const SingleBlog = (props) => {
  const [blog, setBlog] = useState({})
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user);
  blogService.getById(props.match.params.id)
    .then(blog => setBlog(blog))

  return (
    <>
      <h2>blogs</h2>
      {loggedInUser ? <LoggedInHeader/> : null}
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button id="voteButton" type="button" onClick={() => dispatch(blogsVoteAction(blog.id))}>like</button>
      </p>
      added by {blog.author}
      <br/>
      <h2>comments</h2>
      {
        blog.comments
        ? <ul>{blog.comments.map(c => <li>{c}</li>)}</ul>
        : null
      }
    </>
  )
}
export default SingleBlog;

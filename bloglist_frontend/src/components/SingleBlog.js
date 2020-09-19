import React, { useState } from "react";
import LoggedInHeader from "../components/LoggedInHeader";
import { useSelector } from "react-redux";
import blogService from '../services/blogs'
import { useDispatch } from "react-redux";
import { blogsVoteAction } from "../reducers/blogsReducer";
import { notificAction } from "../reducers/notificationReducer";
import { commentsAddAction } from "../reducers/commentsReducer";



const SingleBlog = (props) => {
  const [blog, setBlog] = useState({})
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user);
  blogService.getById(props.match.params.id)
    .then(blog => setBlog(blog))

  const handleCommentChange = (event) => {
    console.log(event.target.value)
    setComment(event.target.value)
  }

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
      <form onSubmit={(event) => {
        event.preventDefault();
        dispatch(commentsAddAction(comment, blog))
        .then( // show notification for success or failure of submitting a blog
          () => {
            dispatch(notificAction({ type: "success", message: `submitted comment "${comment}"`}, 3));
            setComment(''); // clear input fields
          },
          (error) => {
            dispatch(notificAction({ type: "failure", message: `${error.response.data.error} (${error.response.status})`}, 5));
          }
        );
      }
      }>
        <input onChange={handleCommentChange} type='text'/><button type='submit'>add comment</button>
      </form>
      {
        blog.comments
        ? <ul>{blog.comments.map(c => <li>{c}</li>)}</ul>
        : null
      }
    </>
  )
}
export default SingleBlog;

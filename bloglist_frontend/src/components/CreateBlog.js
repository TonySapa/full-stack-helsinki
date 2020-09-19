import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { notificAction } from "../reducers/notificationReducer";
import { blogsAddAction } from "../reducers/blogsReducer";

const CreateBlog = ({
  toggleRef
}) => {
  const [blogInputs, setBlogInputs] = useState({ title: "", author: "", url: "" });
  const dispatch = useDispatch();

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        toggleRef.current(); // toggle visibility of *submit form*
        dispatch(blogsAddAction(blogInputs))
        .then( // show notification for success or failure of submitting a blog
          () => {
            dispatch(notificAction({ type: "success", message: `submitted blog "${blogInputs.title}" by ${blogInputs.author}`}, 3));
            setBlogInputs({ title: "", author: "", url: "" }); // clear input fields
          },
          (error) => {
            dispatch(notificAction({ type: "failure", message: `${error.response.data.error} (${error.response.status})`}, 5));
          }
        );
      }
      }>
        <div>
          title
          <input
            id="titleInput"
            type="text"
            value={blogInputs.title}
            onChange={({ target }) => setBlogInputs({ ...blogInputs, title: target.value })}
          />
        </div>
        <div>
          author
          <input
            id="authorInput"
            type="text"
            value={blogInputs.author}
            onChange={({ target }) => setBlogInputs({ ...blogInputs, author: target.value })}
          />
        </div>
        <div>
          url
          <input
            id="urlInput"
            type="text"
            value={blogInputs.url}
            onChange={({ target }) => setBlogInputs({ ...blogInputs, url: target.value })}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateBlog;

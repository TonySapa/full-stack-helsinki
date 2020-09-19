import React from "react"
import Blog from "./Blog"
import blogService from "../services/blogs"
import LoggedInHeader from "../components/LoggedInHeader"

const LoggedInView = ({ user, blogs }) => {

  return (
    <div>

      <LoggedInHeader />

      <h2>blogs</h2>

      {blogs
        .sort((a, b) => b.votesCount - a.votesCount)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            loggedInUser={user}
            blogs={blogs}
            voteClickHandler={blogService.voteClickHandler}
          />
        ))}

    </div>
  );
};

export default LoggedInView;

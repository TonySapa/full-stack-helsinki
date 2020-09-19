import React from "react";
import LoggedInHeader from "../components/LoggedInHeader";
import { useSelector } from "react-redux";
import { getSubmittersBlogs } from "../utils/dataAnalyzer";

const SingleUser = (props) => {
  const loggedInUser = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const submittersBlogs = getSubmittersBlogs(blogs, props.match.params.id);
  
  let singleUser;
  if (submittersBlogs) singleUser = submittersBlogs[0].user;

  if (loggedInUser && singleUser) {
    return (
      <div>
        {loggedInUser && <LoggedInHeader/>}

        <h3>
          {singleUser.name}
        </h3>
        <h4>
          submitted blogs
        </h4>
        <ul>
          {submittersBlogs
            .map((blog, idx) => 
              <li key={blog.user.id + idx}>
                <i>{blog.title}</i> by {blog.author}
              </li>
            )}
        </ul>
      </div>
    );
  } else {
    return <></>
  }
};

export default SingleUser;

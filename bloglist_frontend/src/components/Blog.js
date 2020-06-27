import React from 'react'
import Togglable from './Togglable'
import LikeButton from './LikeButton'

const blogFormRef = React.createRef()

const Blog = ({ sessionUser, blog, user, updateBlog, eraseBlog, blogObject }) => {
  const BlogStyle1 = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  //console.log(`blog.id: ${blog.id} and typeof: ${typeof blog.id}`);
  return (
    <div style={BlogStyle1}>
      <div className='blogTaser'>{blog.title} {blog.author}</div>
      <Togglable buttonLabel='view' buttonLabel2='hide' ref={blogFormRef}>
        <div>
          {blog.url}
        </div>
        <div id='likes' >
          Likes: {blog.likes}
          <LikeButton
            buttonLabel='like' blog={blog} updateBlog={updateBlog}
            id={blog.id} blogObject={blogObject}
          />
        </div>
        <div>
          {user}
        </div>
        {user === sessionUser
          ? <button onClick={() => eraseBlog(blog.title, blog.id)}>remove</button>
          : null
        }
      </Togglable>
    </div>
  )
}

export default Blog
import React from 'react'
import Togglable from './Togglable'

const blogFormRef = React.createRef()

const Blog = ({ blog, user }) => {
  const BlogStyle1 = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={BlogStyle1}>
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel='view' buttonLabel2='hide' ref={blogFormRef}>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
        </div>
        <div>
          {user}
        </div>
    </Togglable>
    </div>
  )
}

export default Blog

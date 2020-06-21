import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const LikeButton = ({
  blog,
  updateBlog,
  buttonLabel
  }) => {
  const [likes, setLikes] = useState([])

  const handleLikeChange = (event) => {
    setLikes(blog.likes++)
  }

  const addLike = (id, blogObject) => {
    updateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
      // id: blogs.length + 1,
    })
    /*setInfoMessage(`a new blog ${newTitle} added`)
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)*/
  }
  // console.log(`blog: ${JSON.stringify(blog)}`);

  return (
    <button onClick={addLike}>{buttonLabel}</button>
  )
}

LikeButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default LikeButton
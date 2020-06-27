import React from 'react'
import PropTypes from 'prop-types'

const LikeButton = ({
  blog,
  updateBlog,
  buttonLabel
}) => {

  const addLike = () => {
    updateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    })
  }

  return (
    <button className='likeButton' onClick={addLike}>{buttonLabel}</button>
  )
}

LikeButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default LikeButton
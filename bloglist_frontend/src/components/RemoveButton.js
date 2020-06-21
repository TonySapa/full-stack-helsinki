import React from 'react'

const RemoveButton = ({
  blog,
  eraseBlog,
  buttonLabel
}) => {

  const eraseThisBlog = () => {
    eraseBlog(blog.id)
  }

  return (
    <button onClick={eraseThisBlog}>{buttonLabel}</button>
  )
}

export default RemoveButton
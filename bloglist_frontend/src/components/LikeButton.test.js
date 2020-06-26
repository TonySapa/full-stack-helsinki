import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import LikeButton from './LikeButton'



test('If like button is pressed twice addLike is called twice', () => {
  const blog = {
    title: "myTitle",
    author: "myAuthor",
    url: "myUrl",
    likes: 47,
    user: {
      user: "myUser",
      username: "myusername"
    },
    id: 'myId'
  }

  const blogObject = () => {
    console.log('blogObject')
  }

  const addLike = () => {
    console.log('addlike')
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <LikeButton
      buttonLabel='like-xyz' blog={blog} updateBlog={mockHandler}
      id={blog.id} blogObject={blogObject} addLike={addLike}
    />
  )
  const button = getByText('like-xyz')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)
})

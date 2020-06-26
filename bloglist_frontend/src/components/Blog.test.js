import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import Togglable from './Togglable'
import LikeButton from './LikeButton'

const blogFormRef = React.createRef()

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    const BlogStyle1 = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

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

    const user = 'thisUser'

    component = render(
      <div>
        {blog.title} {blog.author}
        <Togglable buttonLabel='view' buttonLabel2='hide' ref={blogFormRef}>
          <div>
            {blog.url}
          </div>
          <div>
            Likes: {blog.likes}
            <LikeButton
              buttonLabel='like' blog={blog}
              id={blog.id}
            />
          </div>
          <div>
            {user}
          </div>
          <button onClick={() => eraseBlog(blog.title, blog.id)}>remove</button>
        </Togglable>
      </div>
      )
    })

  test('By default it renders title and author but not url neither likes', () => {
    const div = component.container.querySelector('.togglableElement')
    expect(div).toHaveStyle('display: none')
  })

  test('After "show" button click url and likes are visible', () => {
    const div = component.container.querySelector('.togglableElement')
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(div).toHaveStyle('display: block')
  })

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

    const updateBlog = () => {
      console.log('updateBlog')
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
})
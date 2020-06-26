import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

test('Form calls the event handler', () => {
  const mockHandler = jest.fn()

  const component = render(
    <BlogForm createBlog={mockHandler} />
  )
  console.log(`component.container.querySelector('input'): ${component.container.querySelector('input')}`);
  const title = component.container.querySelector('#titleInput')
  const author = component.container.querySelector('#authorInput')
  const url = component.container.querySelector('#urlInput')

  const form = component.container.querySelector('form')

  fireEvent.change(title, { target: { value: 'title-x' } })
  fireEvent.change(author, { target: { value: 'author-x' } })
  fireEvent.change(url, { target: { value: 'url-x' } })
  fireEvent.submit(form)

  console.log(`mockHandler.mock.calls: ${JSON.stringify(mockHandler.mock.calls)}`)
  console.log(`mockHandler.mock.calls[0][0].title: ${JSON.stringify(mockHandler.mock.calls[0][0].title)}`)
  expect(mockHandler.mock.calls.length).toBe(1)
  // console.log(JSON.stringify(createBlog.mock.calls[0][0].content, null, 2))
  expect((mockHandler.mock.calls[0][0].title).toString()).toBe('title-x')
  expect((mockHandler.mock.calls[0][0].author).toString()).toBe('author-x')
  expect((mockHandler.mock.calls[0][0].url).toString()).toBe('url-x')
})
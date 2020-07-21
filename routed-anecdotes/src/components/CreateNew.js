import React from 'react'
import  { useField } from '../hooks/index'

import {
  useHistory
} from "react-router-dom"

const CreateNew = ({ addNew, addNotification }) => {
  const history = useHistory()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newObject = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0      
    }
    addNew(newObject)
    addNotification(newObject.content)
    console.log(`content: ${content}`)
    // console.log(`notification: ${JSON.stringify(notification)}`)
    history.push('/')
  }

  const resetForm = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form id='createNew' onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} reset={null} />
        </div>
        <div>
          author
          <input {...author} reset={null} />
        </div>
        <div>
          url for more info
          <input {...info} reset={null} />
        </div>
        <button onClick={resetForm}>reset</button>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateNew
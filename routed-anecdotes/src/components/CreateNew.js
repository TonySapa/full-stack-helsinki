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

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input
            type={author.type}
            value={author.value}
            onChange={author.onChange}           
          />
        </div>
        <div>
          url for more info
          <input
            type={info.type}
            value={info.value}
            onChange={info.onChange}           
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateNew
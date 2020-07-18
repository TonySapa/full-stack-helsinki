import React, {useState} from 'react'

import {
  useHistory
} from "react-router-dom"

const CreateNew = ({ addNew, addNotification }) => {
  const history = useHistory()
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newObject = {
      content: content,
      author: author,
      info: info,
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
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateNew
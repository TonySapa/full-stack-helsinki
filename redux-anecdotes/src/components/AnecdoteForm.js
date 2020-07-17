import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

  const handlecreateAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createAnecdote(content)
    props.setNotification(`you added "${content}"`, 10)
  }

  return (
    <div>
      <form onSubmit={handlecreateAnecdote}>
        <h2>create new</h2>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(
  null, 
  { createAnecdote, setNotification }
)(AnecdoteForm)
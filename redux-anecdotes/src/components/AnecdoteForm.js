import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
//import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handlecreateAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    /*anecdoteService
      .createNew(content)
      //.then(dispatch(createAnecdote(content)))*/
    
    dispatch(createAnecdote(content))
    
    dispatch(setNotification(`you added "${content}"`))
    setTimeout(() => dispatch(clearNotification()), 5000)
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

export default AnecdoteForm
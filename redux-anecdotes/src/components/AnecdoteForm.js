import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (store) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.entry.value
    event.target.entry.value = ''
    
    dispatch(createAnecdote(content))
  }


  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div><input name='entry' /></div>
      <button>create</button>
    </form>
  )  
}

export default AnecdoteForm
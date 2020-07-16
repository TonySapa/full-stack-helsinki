import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  
  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id, anecdote.content, anecdote.votes))
    dispatch(setNotification(`you voted "${anecdote.content}"`, 10))
  }

  const anecdotes = useSelector(state => state.anecdotes)
  //console.log(`anecdotes: ${JSON.stringify(anecdotes)}`)
  const filter = useSelector(state => state.filter)
  let sortedAnecdotes = [...anecdotes]
  sortedAnecdotes.sort((a, b) => b.votes - a.votes)
  const filteredAnecdotes = sortedAnecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
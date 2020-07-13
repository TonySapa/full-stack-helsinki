import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
  function byVotes(a, b) {
    return b.votes - a.votes
  }

  const anecdotes = useSelector(state => state).sort(byVotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    return {
      type: 'VOTE',
      data: { id }
    }
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
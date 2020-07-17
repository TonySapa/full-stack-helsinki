import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const anecdotesToShow = () => {
    const anecdotes = props.anecdotes
    const filter = props.filter
    anecdotes.sort((a, b) => b.votes - a.votes)
    return anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  }
  
  const handleVote = (anecdote) => {
    props.voteAnecdote(anecdote.id, anecdote.content, anecdote.votes)
    props.setNotification(`you voted "${anecdote.content}"`, 10)
  }


  return (
    <div>
      {anecdotesToShow().map(anecdote =>
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

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  { voteAnecdote, setNotification}
)(AnecdoteList)

export default ConnectedAnecdotes
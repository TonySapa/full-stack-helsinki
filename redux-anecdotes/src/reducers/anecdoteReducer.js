import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (id, content, votes) => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(id, content, votes + 1)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)

      const votedAnectode = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }

      return state
        .map(a => a.id !== id ? a : votedAnectode)
        .sort((a1,a2) => a2.votes - a1.votes)
    case 'ADD':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer
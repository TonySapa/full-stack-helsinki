import anecdoteService from '../services/anecdotes'

/*const asObject = (anecdote) => {
  return {
    content: anecdote,
    // id: getId(),
    votes: 0
  }
}*/

export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

/*export const createAnecdote = content => {
  return {
    type: 'ADD',
    data: asObject(content)
  }
}*/

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      //data: asObject(content)
      data: newNote,
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
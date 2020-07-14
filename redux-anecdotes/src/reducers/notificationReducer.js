const defaultNotification = {
  message: 'default text (just to test)'
}

const notificationReducer = (state=defaultNotification, action) => {
  switch(action.type) {
    case 'NEW':
      return {...state, message: action.data}
    case 'VOTE':
      return {...state, message: action.data}
    default:
      return state;
  }
}

export const newNotification = (anecdote, time) => {
  return async dispatch => {
    dispatch({
      type: 'NEW',
      data: `You created: "${anecdote}"`
    });
    setTimeout(() => 
      dispatch({
        type: 'REMOVE',
        data: ''
      }),
    time)
  }
}

export const voteNotification = (anecdote, time) => {
  return async dispatch => {
    dispatch({
      type: 'VOTE',
      data: `You voted for: "${anecdote}"`
    })
    setTimeout(() => 
      dispatch({
        type: 'REMOVE',
        data: ''
      }),
    time)
  }
}

export default notificationReducer;
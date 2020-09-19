export const setNotification  = (message, time) => {
  return async dispatch => {
    const newNotif = { message: message, time: time }
    dispatch({
      type: 'SET_NOTIFICATION',
      data: newNotif,
    })
    await setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, time * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

const initialState = {
  message: 'default text (just to test)',
  time: 0,
}

const notificationReducer  = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.data.message, time: action.data.time }

    case 'CLEAR_NOTIFICATION':
      return initialState

    default:
      return state
  }
}

export default notificationReducer 
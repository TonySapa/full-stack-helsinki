
export const setNotification = (notification, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification }  
    })
    setTimeout(() => dispatch(clearNotification()), seconds*1000)
  }
}

export const clearNotification = (notification) => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

const notificationReducer = (state = 'default text (just to test)', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export default notificationReducer
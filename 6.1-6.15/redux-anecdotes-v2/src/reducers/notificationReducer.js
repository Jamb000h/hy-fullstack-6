const initialState = {
  text: 'Initial notification',
  show: false
}

export const notify = (text, duration) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        text
      }
    })
    setTimeout( () => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, duration * 1000) // Duration is given as seconds, so multiply by 1000
  }
}

const notificationReducer = (store = initialState, action) => {
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return { text: action.data.text, show: true}
    case 'HIDE_NOTIFICATION':
      return { text: '', display: false}
    default:
      return store
  }
}

export default notificationReducer
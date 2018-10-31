const initialState = {
  text: 'Initial notification',
  show: false
}

export const showNotification = text => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: {
      text
    }
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
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
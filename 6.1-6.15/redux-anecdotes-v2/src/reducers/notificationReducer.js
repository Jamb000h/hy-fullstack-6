const initialState = {
  text: 'Initial notification'
}

const notificationReducer = (store = initialState, action) => {
  if (action.type==='SHOW_NOTIFICATION') {
    return {...store, text: action.data.text}
  }
  return store
}

export default notificationReducer
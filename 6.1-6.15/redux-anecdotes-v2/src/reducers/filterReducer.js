const initialState = ''

export const updateFilter = text => {
  return {
    type: 'UPDATE_FILTER',
    data: {
      text
    }
  }
}

const filterReducer = (store = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_FILTER':
      return action.data.text
    default:
      return store
  }
}

export default filterReducer
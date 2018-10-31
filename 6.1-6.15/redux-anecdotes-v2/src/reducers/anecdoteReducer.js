import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    content
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (store = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const old = store.filter(a => a.id !==action.id)
      const voted = store.find(a => a.id === action.id)

      return [...old, { ...voted, votes: voted.votes+1 } ]

    case 'CREATE':
      return [...store, action.content]

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return store
  }
}

export default anecdoteReducer
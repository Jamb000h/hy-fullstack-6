import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {

  vote = (id) => {
    this.props.store.dispatch(voteAnecdote(id))
    this.props.store.dispatch(showNotification('Vote registered!'))
    setTimeout( () => {
      this.props.store.dispatch(hideNotification())
    }, 5000)
  }

  render() {
    const state = this.props.store.getState()

    const anecdotes = state.filter.length > 0
      ? state.anecdotes.filter( a => a.content.indexOf(state.filter) !== -1)
      : state.anecdotes

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                this.vote(anecdote.id)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList

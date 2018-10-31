import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
class AnecdoteList extends React.Component {

  vote(id) {
    const voted = this.props.filteredAnecdotes.find(a => a.id === id)
    this.props.voteAnecdote(voted)
    this.props.notify(`Voted '${voted.content}'`, 5)
  }

  render() {

    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const filteredAnecdotes = (anecdotes, filter) => {
  return filter.length > 0
    ? anecdotes.filter( a => a.content.indexOf(filter) !== -1)
    : anecdotes
}

const mapStateToProps = (state) => {
  return {
    filteredAnecdotes: filteredAnecdotes(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps =
  {
    voteAnecdote,
    notify
  }

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList

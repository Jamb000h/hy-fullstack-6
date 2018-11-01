import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => {
        return (
          <ListGroupItem key={anecdote.id} >
            <NavLink to={`/anecdotes/${anecdote.id}`}>
              {anecdote.content}
            </NavLink>
          </ListGroupItem>
        )
      })}
    </ListGroup>  
  </div>
)

const About = () => (
  <Row>
    <Col xs={12} sm={8}>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>
      
      <em>An anecdote is a brief, revealing account of an individual person or an incident. 
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
        An anecdote is "a story with a point."</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </Col>
    <Col xs={12} sm={4}>
      <img src="grace-hopper.jpg" alt="Grace Hopper" />
    </Col>
  </Row>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>content</ControlLabel>
            <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>author</ControlLabel>
            <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>content</ControlLabel>
            <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
          </FormGroup>
          <Button bsStyle="primary" type="submit">create</Button>
        </form>
      </div>  
    )

  }
}

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>Has {anecdote.votes} votes</p> 
  </div>
)

const notificationStyles = {
  padding: '.2rem 1rem',
  margin: '0 1rem',
  borderLeft: '4px solid #57eb57',
  boxShadow: '1px 1px 5px 2px rgba(224,224,224,1)',
  fontFamily: 'Arial',
  fontWeight: '18'
}

const Notification = ({notification}) => (
  <div style={notificationStyles}>
    <p>{ notification }</p>
  </div>
)

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.setState({ notification: `A new anecdote ${anecdote.content} added`})
    setTimeout( () => {
      this.setState({ notification: '' })
    }, 10 * 1000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {

    const menuStyle = {
      padding: '.5rem',
      marginTop: '2rem'
    }

    const linkStyle = {
      fontFamily: 'Arial',
      fontSize: 20,
      textAlign: 'center',
      padding: '.5rem 1rem',
      margin: '0 .5rem 0 0',
      textDecoration: 'none',
      textTransform: 'uppercase',
      color: 'white',
      backgroundColor: 'lightgrey'
    }

    const activeLinkStyle = {
      backgroundColor: 'lightBlue'
    }

    return (
      <div className="container">
        <Router>
        <div style={menuStyle}>
          <NavLink exact to="/" style={linkStyle} activeStyle={activeLinkStyle}>home</NavLink> &nbsp;
          <NavLink exact to="/create" style={linkStyle} activeStyle={activeLinkStyle}>create</NavLink> &nbsp;
          <NavLink exact to="/about" style={linkStyle} activeStyle={activeLinkStyle}>about</NavLink>
          <h1>Software anecdotes</h1>
          { this.state.notification.length > 0 ?
            <Notification notification={this.state.notification} />
            : null }
          <Row>
            <Col xs={12} sm={8}>
              <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route path="/create" render={({history}) => 
                <CreateNew history={history} addNew={this.addNew}/>} />
              <Route path="/about" render={() => <About />  } />
              <Route path="/anecdotes/:id" render={({match}) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
            </Col>
          </Row>
        </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;

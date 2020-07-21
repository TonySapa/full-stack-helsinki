import React, { useState } from 'react'
import Home from './components/Home'
import About from './components/About'
import Anecdote from './components/Anecdote'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'

import {
  Switch,
  Route,
  Link,
  //Redirect,
  useRouteMatch
} from "react-router-dom"

const App = () => {
  const [notification, setNotification] = useState('')
  const [anecdotes, setAnecdotes] = useState([
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
  ])

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const addNotification = async (anecdote) => {
    setNotification(`a new anecdote "${anecdote}" has been created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)   
  }

  /*const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }*/

  const padding = {
    paddingRight: 5
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(anecdote => Number(anecdote.id) === Number(match.params.id))
    : null

  console.log(`anecdote: ${anecdote}`)

  return (
    <>
      <h1>Software anecdotes</h1>
      <div>
        <div>
          <Link style={padding} to="/">anecdotes</Link>
          <Link style={padding} to="/create">create new</Link>
          <Link style={padding} to="/about">about</Link>
        </div>

        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdote={anecdote} />
          </Route>          
          <Route path="/create">
            <CreateNew addNew={addNew} addNotification={addNotification} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home anecdotes={anecdotes} notification={notification} />
          </Route>      
        </Switch>
      </div>
      <Footer />
    </>
  )
}

export default App
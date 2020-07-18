import React from 'react'
import AnecdoteList from './AnecdoteList'

const Home = ({ anecdotes, notification }) => (
  <>
    <AnecdoteList anecdotes={anecdotes} notification={notification} />
  </>
)

export default Home
import React from 'react'

import {
  Link
} from "react-router-dom"

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <div>{notification}</div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(a =>
        <li key={a.id}>
          <Link to={`/anecdotes/${a.id}`}>{a.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

export default AnecdoteList
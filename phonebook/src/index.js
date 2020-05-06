import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '+34938054726'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '+447450626465'
  }
]

ReactDOM.render(
  <App persons={persons} />,
  document.getElementById('root')
)
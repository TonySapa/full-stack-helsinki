const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
const PORT = process.env.PORT
const url = process.env.MONGODB_URI
require('dotenv').config()
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())


/*app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})*/

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})



/*
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const person = req.body
  if (!person.name && !person.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  } else if (!person.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  } else if (!person.number) {
    return res.status(400).json({
      error: `${person.name}'s number missing`
    })
  }
  persons.forEach(personItem => {
    if (personItem.name == person.name) {
      return res.status(409).json({
        error: `Duplicated entry: ${person.name} already exists with number ${person.number} and id ${person.id}`
      })
    }
  })

  person.id = Math.floor(10000000000000 * Math.random());
  console.log(person)
  res.json(person)
  morgan.token('type', function (req, res) { return req.body['name'] })
})

const infoMessage = `<p>Phonebook has info for ${persons.length} people</p>${new Date()}`


app.get('/info', (req, res) => {
  res.send(infoMessage)
})
*/

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
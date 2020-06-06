const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')
const PORT = process.env.PORT
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

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(res.status(204).end())
    .catch(error => next(error))
})

/*app.delete('/api/persons/:id', (req, res) => {
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
})*/

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number || false,
  })

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    }) 
    .catch(error => next(error))
})
  
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(409).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


/*
const infoMessage = `<p>Phonebook has info for ${persons.length} people</p>${new Date()}`


app.get('/info', (req, res) => {
  res.send(infoMessage)
})
*/

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
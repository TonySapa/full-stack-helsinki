const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())



var persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
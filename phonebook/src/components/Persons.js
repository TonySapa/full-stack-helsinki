import React from 'react'
import Person from './Person'

const Persons = ({ persons, filterName }) => {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filterName.toLocaleLowerCase())).map((person, i) => 
        <Person key={i} person={person} />
      )}
    </ul>
  )
}

export default Persons
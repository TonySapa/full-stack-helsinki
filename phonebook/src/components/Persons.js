import React from 'react'
// import Person from './Person'

const Persons = ({ persons, filterName, deleteContact }) => {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filterName.toLocaleLowerCase())).map((person, i) => 
      <li key={person.name}>
        {person.name} {person.number} 
        <button onClick={() => deleteContact(person)}>Delete</button>
      </li>
      )}
    </ul>
  )
}

export default Persons
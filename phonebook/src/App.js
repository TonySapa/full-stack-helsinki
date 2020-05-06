import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = (props) => {
  const [persons, setpersons] = useState(props.persons)
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addperson = (event) => {
    event.preventDefault()
    console.log(newName);
    console.log(newNumber);

    var duplicated;
    for (let i = 0; i < persons.length; i++) {
      if(persons[i].name.toLowerCase() === newName.toLowerCase()) {duplicated = true}
    }

    console.log(`duplicated: ${duplicated}`);
    
    if (!duplicated) {
      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
    
      setpersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log(persons);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  const handlepersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlenumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h2>add a new:</h2>
      <PersonForm addperson={addperson} newName={newName} handlepersonChange={handlepersonChange} newNumber={newNumber} handlenumberChange={handlenumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} />
    </div>
  )
}

export default App
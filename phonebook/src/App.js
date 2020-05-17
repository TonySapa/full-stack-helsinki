import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/contacts'
import Notification from './components/Notification'

const App = (props) => {
  const [persons, setpersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [confirmation, setconfirmation] = useState({ text: "", type: "" })

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setpersons(response.data)
      })
  }
  
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

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
      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setpersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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

  const deleteContact = ({ name, id }) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setpersons(persons.filter((p) => p.id !== id));
        })
        .catch((err) => {
          showConfirmation(`${name} was already deleted`, "error");
        });
    }
  };

  const showConfirmation = (text, type) => {
    setconfirmation({
      text,
      type,
    });
    if (type !== "error") {
      setTimeout(() => {
        setconfirmation({ text: "", type: "" });
      }, 5000);
    }
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification confirmation={confirmation} />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h2>add a new:</h2>
      <PersonForm addperson={addperson} newName={newName} handlepersonChange={handlepersonChange} newNumber={newNumber} handlenumberChange={handlenumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} deleteContact={deleteContact} />
    </div>
  )
}

export default App
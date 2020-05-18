import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/contacts'
import DeleteNotification from './components/DeleteNotification'
import UpdateNotification from './components/UpdateNotification'


const App = (props) => {
  const [persons, setpersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [deleteConfirmation, setDeleteConfirmation] = useState({ text: "", type: "" })
  const [updateConfirmation, setUpdateConfirmation] = useState({ text: "", type: "" })

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {};
        for (let i = 0; i < persons.length; i++) {
          if ((persons[i].name).toLowerCase() === newName.toLowerCase()) {
            personObject.name = newName;
            personObject.number = newNumber;
            personObject.id = persons[i].id;
          }
        }
        console.log('personObject:' + personObject);
        console.log(`personObject.id: ${personObject.id}`);
        personService
        .update(personObject.id, personObject)
        .then(() => {
          setpersons((persons.filter((p) => p.id !== personObject.id)).concat(personObject));
        })
        .catch((err) => {
          showUpdateConfirmation(`${personObject.name} was already updated`, "error");
        });
      }
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
          showDeleteConfirmation(`${name} was already deleted`, "error");
        });
    }
  };

  const showDeleteConfirmation = (text, type) => {
    setDeleteConfirmation({
      text,
      type,
    });
    if (type !== "error") {
      setTimeout(() => {
        setDeleteConfirmation({ text: "", type: "" });
      }, 5000);
    }
  };

  const showUpdateConfirmation = (text, type) => {
    setUpdateConfirmation({
      text,
      type,
    });
    if (type !== "error") {
      setTimeout(() => {
        setUpdateConfirmation({ text: "", type: "" });
      }, 5000);
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <DeleteNotification confirmation={deleteConfirmation} />
      <UpdateNotification confirmation={updateConfirmation} />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h2>add a new:</h2>
      <PersonForm addperson={addperson} newName={newName} handlepersonChange={handlepersonChange} newNumber={newNumber} handlenumberChange={handlenumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} deleteContact={deleteContact} />
    </div>
  )
}

export default App
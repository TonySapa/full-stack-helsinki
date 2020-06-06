import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/contacts'
import DeleteNotification from './components/DeleteNotification'
import UpdateNotification from './components/UpdateNotification'
import InfoAlert from './components/InfoAlert'
import DeleteInfoAlert from './components/DeleteInfoAlert'
import { getNodeText } from '@testing-library/react'


const App = (props) => {
  const [persons, setpersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const deleteConfirmation = useState({ text: "", type: "" })
  const [updateConfirmation, setUpdateConfirmation] = useState({ text: "", type: "" })
  const [infoMessage, setInfoMessage] = useState('')
  const [deleteInfoMessage, setDeleteInfoMessage] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('/api/persons') // https://tsdev-fullstackopen-phonebook.herokuapp.com/api/persons
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
          setInfoMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(JSON.stringify(error.response.data));
          setDeleteInfoMessage(
            `${JSON.stringify(error.response.data)}`
          )
          setTimeout(() => {
            setDeleteInfoMessage(null)
          }, 5000)
        })

    } else if (duplicated) {
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
          setInfoMessage(
            `Updated ${newName} number`
          )
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
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
          setInfoMessage(
            `${name} has been successfully removed`
          )
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
        })
        .catch((err) => {
          setpersons(persons.filter((p) => p.id !== id));
          setDeleteInfoMessage(
            `Information of ${name} has already been removed from server`
          )
          setTimeout(() => {
            setDeleteInfoMessage(null)
          }, 5000)
        });
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
      <InfoAlert message={infoMessage} />
      <DeleteInfoAlert message={deleteInfoMessage} />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h2>add a new:</h2>
      <PersonForm addperson={addperson} newName={newName} handlepersonChange={handlepersonChange} newNumber={newNumber} handlenumberChange={handlenumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} deleteContact={deleteContact} />
    </div>
  )
}

export default App
import React, { useState } from 'react'
import Person from './components/Person'


const App = (props) => {
  const [persons, setpersons] = useState(props.persons)
  const [newName, setNewName] = useState('') 

  const addperson = (event) => {
    event.preventDefault()
    console.log(newName);

    var duplicated;
    for (let i = 0; i < persons.length; i++) {
      if(persons[i].name === newName) {duplicated = true}
    }

    console.log(`duplicated: ${duplicated}`);
    
    if (!duplicated) {
      const personObject = {
        id: persons.length + 1,
        name: newName,
      }
    
      setpersons(persons.concat(personObject))
      setNewName('')
      console.log(persons);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  const handlepersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addperson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handlepersonChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => 
          <Person key={i} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App
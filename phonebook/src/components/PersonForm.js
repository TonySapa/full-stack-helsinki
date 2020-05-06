import React from 'react'

const PersonForm = ({ addperson, newName, handlepersonChange, newNumber, handlenumberChange }) => {

  return (
    <form onSubmit={addperson}>
      <div>
        name:
        <input
          value={newName}
          onChange={handlepersonChange}
        />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={handlenumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
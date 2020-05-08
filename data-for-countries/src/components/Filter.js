
import React from 'react'

const Filter = ({filterName, handleFilterChange}) => {
  return (
    <div>
      find countries
      <input 
        value={filterName}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default Filter
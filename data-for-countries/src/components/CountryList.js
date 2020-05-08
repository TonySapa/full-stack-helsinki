import React from 'react'

const CountryList = ({ country, filter }) => {
  return (
    <ul>
        <li>{country.name} <button value={country.name} onClick={filter} >show</button></li>
    </ul>
  )
}

export default CountryList
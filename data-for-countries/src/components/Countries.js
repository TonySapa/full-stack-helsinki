import React from 'react'
import Country from './Country'

const Countries = ({ countries, filterName }) => {
  const filteredResult = countries.filter(country => country.name.toLowerCase().includes(filterName.toLowerCase()));
  console.log(`filtered result size: ${filteredResult.length}`);

  // conditional rendering
  if (filteredResult.length === 0 || filteredResult.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>    
    )
  } else if (filteredResult.length > 1) {
    return (
      <ul>
        {filteredResult.map((country, i) => 
          <li>{country.name}</li>
        )}
      </ul>
    )  
  } else if (filteredResult.length === 1) {
    return (
      <>
        {filteredResult.map((country, i) => 
          <Country key={i} country={country} />
        )}
      </>
    )  
  }
}

export default Countries
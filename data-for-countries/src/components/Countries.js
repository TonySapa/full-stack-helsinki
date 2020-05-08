import React from 'react'
import CountryDetail from './CountryDetail'
import CountryList from './CountryList'

const Countries = ({ countries, filterName, filter }) => {
  const filteredResult = countries.filter(country => country.name.toLowerCase().includes(filterName.toLowerCase()));
  console.log(`filtered result size: ${filteredResult.length}`);

  // conditional rendering
  if (filteredResult.length === 0 || filteredResult.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>    
    )
  } else if (filteredResult.length > 1) {
    return (
      <>
        {filteredResult.map((country, i) => 
          <CountryList key={i} country={country} filter={filter} />
        )}
      </>
  )  
  } else if (filteredResult.length === 1) {
    return (
      <>
        {filteredResult.map((country, i) => 
          <CountryDetail key={i} country={country} />
        )}
      </>
    )  
  }
}

export default Countries